import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import moment from 'moment';
import PullView from './common/pullView';

import {Header,template, Tartab} from './common/mixin';
import { Button, Icon, Toast } from 'antd-mobile';
import _ from 'lodash';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
moment.locale('zh-cn')
let pageIndex = 1;
class Main extends Component {
    constructor() {
        super();
        this.state = {
            scrollState: 0,  // 1可以加载 2 加载中 3加载完成 4 没有内容了；
            initData: [],
            loadingTip: "查看更多"
        }
    }

    componentWillMount() {
       
    }
   

    componentDidMount() { 
        if (this.props.requestData.video) {
            this.setState({
                initData: this.props.requestData.video.data
            });
        } else {
            Toast.loading('加载中...', 0);
            this.props.getVideoData(`http://infoapi.games-cube.com/GetNewstVideos?p=${1}`, null, (data) => {
                Toast.hide();
                this.setState({
                    initData: data.data
                });
            }, 'video');
        }
        
    }

     componentDidUpdate() {
        /*
        **加载完成后改变scrollState的状态
        */
        if (this.state.scrollState == 3) {
            this.setState({
                scrollState: 1
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    componentWillUpdate(nextProps,nextState){
        if (this.props !== nextProps) {
            let {data} = nextProps.state;

        }
    }

    scrollBottom() {
        //滑动到底部时加载；
        if (this.state.scrollState == 0 || this.state.scrollState == 1) {
            this.setState({
                scrollState: 2,
                loadingTip: '正在加载中'
            });
            let p = pageIndex++;
            this.props.getVideoData(`http://infoapi.games-cube.com/GetNewstVideos?p=${p}`, null, (data) => {
                if (data.code == 0 && data.data.length > 0) {
                    let initData = this.state.initData;
                    this.setState({
                        initData: initData.concat(data.data),
                        scrollState: 3,
                        loadingTip: '查看更多'
                    })
                }else{
                    this.setState({
                        scrollState: 4,
                        loadingTip: '已经到最底了!'
                    })
                }
            });
        }
    }
   
    render() {
        let videos = this.state.initData;
        return (
            
            <section>
                <Header title="视频" />
                <Tartab selected="1" />
                <PullView onScrollToBottom={() => {this.scrollBottom()}}>
                    <ul className="video-page">
                        {
                            !_.isEmpty(videos) && videos.map((k ,i) => {
                            return (
                                    <li key={i}>
                                        <Link>
                                            <div className="video-img">
                                                <LazyLoad height={322} debounce={500}  throttle={100} offset={100} placeholder={<img src={require('src/Style/img/img_fail_middle.png')} />}>
                                                    <ReactCSSTransitionGroup key='1'
                                                        transitionName="fade"
                                                        transitionAppear={true}
                                                        transitionAppearTimeout={200}
                                                        transitionEnter={false}
                                                        transitionLeave={false}>
                                                        <img src={k.img} alt=""/>
                                                    </ReactCSSTransitionGroup>
                                                </LazyLoad >
                                                <div className="player-icon">
                                                    <img src={require('src/Style/img/video_play.png')} alt=""/>
                                                </div>
                                            </div>
                                            <h4>{k.title}</h4>
                                            <p>{moment(k.createdate).endOf('day').fromNow()}</p>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </PullView>
                {this.state.scrollState !=0 && <div className="scroll-loading">
                    <p>
                        {this.state.scrollState == 2 ? <Icon type="loading" /> : ""}    
                        {this.state.loadingTip}
                    </p>
                </div>}
                <div className="bottom-space"></div>
            </section>
        )
    }
    
    componentWillUnmount() {
    }
}

export default template({
    id: 'video',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

