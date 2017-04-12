import React, { Component, PropTypes } from 'react';

export default class PullView extends Component {
    constructor() {
        super(...arguments);
        this._onTouchStart = this._onTouchStart.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        this._onScroll = this._onScroll.bind(this);
        this._onPulling = this._onPulling.bind(this);
        this._onPullEnd = this._onPullEnd.bind(this);
        this._changeStatus = this._changeStatus.bind(this);
        this.state = {
            pulledY: 0 // 下拉的距离
        };

        this.touching = false; // 是否处于touch状态，其实是用于兼容PC端，在mousedown之后才允许mousemove的逻辑
        this.startY = undefined; // 记录pull起始位置
        this.endY = undefined; // 记录pull当前位置
        this.status = 0; // 0. 未touchstart 1.pulling但未达到pulledPauseY 2.pulling达到pulledPauseY 3.进入pause状态
        this.lastScrollTop = undefined; // 上次scrollTop的位置，用于和当前滚动位置比较，判断是向上滚还是向下滚
        this.container = this.props.container || document.body; // pull的对象 
        this.scrollElement = this.props.scrollElement || window;
    }

    componentWillReceiveProps({toStopPause, onPauseStopped}) {
        // 当状态为3且接受到参数toStopPause为true时，状态回到0
        if (toStopPause && this.status === 3) {
            this.setState({
                pulledY: 0
            });
            this._changeStatus(0);
            onPauseStopped && onPauseStopped();
        }
    }

    componentDidMount() {
        const {props: {mountScrollTop}, container, scrollElement} = this;

        // 滚动到初始位置
        container.scrollTop = mountScrollTop;
        this.lastScrollTop = mountScrollTop;

        // 绑定事件
        container.addEventListener('touchstart', this._onTouchStart);
        container.addEventListener('touchmove', this._onTouchMove, { passive: false });
        container.addEventListener('touchend', this._onTouchEnd);
        container.addEventListener('mousedown', this._onTouchStart);
        container.addEventListener('mousemove', this._onTouchMove, { passive: false });
        container.addEventListener('mouseup', this._onTouchEnd);
        
        scrollElement.addEventListener('scroll', this._onScroll);
    }

    componentWillUnmount() {
        const {props: {onPullViewUnmount}, container, scrollElement} = this;

        onPullViewUnmount && onPullViewUnmount(container.scrollTop);

        // 解绑事件
        container.removeEventListener('touchstart', this._onTouchStart);
        container.removeEventListener('touchmove', this._onTouchMove);
        container.removeEventListener('touchend', this._onTouchEnd);
        container.removeEventListener('mousedown', this._onTouchStart);
        container.removeEventListener('mousemove', this._onTouchMove);
        container.removeEventListener('mouseup', this._onTouchEnd);
        scrollElement.removeEventListener('scroll', this._onScroll);
    }

    _onTouchStart() {
        this.touching = true;
    }

    _onTouchMove(e) {
        if (!this.touching) return;

        const {
            props: {onPulling, scaleY},
            container, startY, status, _onPulling
        } = this;
        const eTouchScreenY = e.touches ? e.touches[0].screenY : e.screenY;

        if (status) { // 状态非0时
            const pulledY = (eTouchScreenY - startY) * scaleY; // 用scaleY对pull的距离进行缩放

            if (pulledY >= 0) { // 进行下拉
                this.endY = eTouchScreenY;
                this.setState({
                    pulledY: pulledY
                });

                if (status !== 3) { // 在状态不为3时，即状态为1或2时
                    _onPulling && _onPulling(pulledY);
                }

                onPulling && onPulling(pulledY); // 始终触发外部的onPulling事件

                e.preventDefault();
            } else { // 上滑，其实只有状态为3时才会进入该逻辑，回到状态0
                this._changeStatus(0);
                this.setState({
                    pulledY: 0
                });
            }
        } else { // 状态为0时
            if (container.scrollTop === 0) { // 当scrollTop为0时进入状态1
                this.startY = eTouchScreenY;
                this._changeStatus(1);
            }
        }
    }

    _onScroll() {
        const {container, props: {toBottom, onScrollToBottom, onScrollUp, onScrollDown, scrollElement}} = this;
        const scrollTop = Math.ceil(container.scrollTop);
        const clientHeight = scrollElement.clientHeight || window.innerHeight;
        const scrollHeight = container.scrollHeight;
        // 当距离底部toBottom距离，触发onScrollToBottom
        if (scrollTop + clientHeight + toBottom >= scrollHeight) {
            onScrollToBottom && onScrollToBottom();
        }

        // 与上次滚动位置比较，判断当前是向上滚还是向下滚
        if (scrollTop > this.lastScrollTop) {
            onScrollUp && onScrollUp();
        } else {
            onScrollDown && onScrollDown();
        }

        this.lastScrollTop = scrollTop;
    }

    _onTouchEnd() {
        const {props: {pulledPauseY}, state: {pulledY}, status, _onPullEnd} = this;

        if (status) {
            const isPause = _onPullEnd ? _onPullEnd(pulledY) : false;

            this.setState({
                pulledY: isPause ? pulledPauseY : 0
            });
        }

        this.touching = false;
    }

    /**
     * 在未处于状态3时触发，进行状态切换1、2间的切换
     * @param pulledY
     * @private
     */
    _onPulling(pulledY) {
        const {props: {pulledPauseY}, status} = this;

        if (pulledY > pulledPauseY) {
            if (status !== 2) {
                this._changeStatus(2);
            }
        } else {
            if (status !== 1) {
                this._changeStatus(1);
            }
        }
    }

    /**
     * 根据pulledY的位置与pulledPauseY比较，判断是否进入状态3还是回到状态0
     * @param pulledY
     * @returns {boolean}
     * @private
     */
    _onPullEnd(pulledY) {
        const {pulledPauseY, onPullEnd} = this.props;

        if (pulledY > pulledPauseY) {
            this._changeStatus(3);
            onPullEnd && onPullEnd();
            return true;
        } else {
            this._changeStatus(0);
            return false;
        }
    }

    /**
     * 进行状态切换
     * @param status
     * @private
     */
    _changeStatus(status) {
        const {onStatusChange} = this.props;

        this.status = status;
        onStatusChange && onStatusChange(this.status);
    }

    render() {
        const {props: {children, unit}, state: {pulledY}} = this;

        return (
            <div
                style={{
                    transform: `translateY(${pulledY}${unit})`
                }}
                >
                {children}
            </div>
        )
    }
}


PullView.propTypes = {
    onPulling: PropTypes.func, // 状态非0且正在下拉时的事件，返回pull的距离
    onPullEnd: PropTypes.func, // 下拉结束即从状态2切换到状态3时的事件
    onScrollToBottom: PropTypes.func, // 滚动到底部事件，当滚动到距离底部toBottom位置时触发，可用于下滑加载更多
    onScrollUp: PropTypes.func, // 向上滚动事件，可用于上滚隐藏AppHeader等
    onScrollDown: PropTypes.func, // 向下滚动事件，可用于下滚显示AppHeader等
    onPullViewUnmount: PropTypes.func, // 在PullView将要Unmount时调用，可用于记录当前滚动位置，在下次Mount时作为下面的mountScrollTop参数传入，回到上次滚动位置
    onStatusChange: PropTypes.func, // 当status变化时的事件，返回改变后的状态，结合个人需要对不同状态做出相应视图改变，比如比如下拉时顶部显示相应的提示
    onPauseStopped: PropTypes.func, // 当toStopPause传递为true后，stopPause完成后的事件
    mountScrollTop: PropTypes.number,// 初始化时的滚动位置
    toBottom: PropTypes.number, // 当滚动到距离底部toBottom位置时将触发onScrollToBottom事件
    pulledPauseY: PropTypes.number, // 处于pause状态即status为3时的Y方向应所在的位置
    toStopPause: PropTypes.bool, // 是否需要终止暂停状态
    scaleY: PropTypes.number, // 下拉距离缩放比例，将会影响能够下拉的距离
    unit: PropTypes.string // 单位，在移动端用的单位可能不是px，pulledPauseY和state中的pulledY都将使用这一单位，在使用px之外的单位时，需要设置好scaleY
};

PullView.defaultProps = {
    scaleY: 0.2,
    toBottom: 50,
    pulledPauseY: 40,
    mountScrollTop: 0,
    toStopPause: false,
    unit: 'px'
};