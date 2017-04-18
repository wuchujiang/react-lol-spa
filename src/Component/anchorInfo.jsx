import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Tool} from '../Config/Tool';
import {Header,template, Tartab} from './common/mixin';
import { Icon, List, Result, Toast } from 'antd-mobile';
import _ from 'lodash';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';

const Item = List.Item;
class Main extends Component {
    constructor() {
        super();
        this.state = {
            videos: []
        }
    }

    componentWillMount() {
       
    }

    componentDidMount() {
        Toast.loading('加载中', 0);
        this.props.getVideoData(`/GetAuthorVideos?author=${this.props.location.query.id}&p=1`, null, (data) => {
            Toast.hide();
            if (data.code == 0 ) {
                this.setState({
                   videos: data.data.length > 0 ? data.data : ""
               })
            } else {
                Toast.fail('系统错误！');
           }
        });
    }

    

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    componentWillUpdate(nextProps,nextState){
        if (this.props !== nextProps) {
            let {data} = nextProps.state;

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

    clickHandle() {
         
    }
   
    render() {
        let videos = this.state.videos;
        let {img, name, content} = this.props.location.query;
        return (
            <section>
                <Header title={name}/>
                <div className="anchors-info">
                    <div className="anchors">
                        <img src={img} alt=""/>
                    </div>
                    <p>{content}</p>
                </div>
                <section className="video">
                    {Array.isArray(videos) ? <ul className="video-page">
                        {
                            !_.isEmpty(videos) && videos.map((k, i) => {
                                return (
                                    <li key={i}>
                                        <Link to={{
                                            pathname: `/video/player`,
                                            query: {
                                                content: encodeURIComponent(k.content)
                                            }
                                        }}>
                                            <div className="video-img">
                                                <LazyLoad debounce={500} offset={100} placeholder={<img src={require('src/Style/img/img_fail_middle.png')} />}>
                                                    <ReactCSSTransitionGroup key='1'
                                                        transitionName="fade"
                                                        transitionAppear={true}
                                                        transitionAppearTimeout={500}
                                                        transitionEnter={false}
                                                        transitionLeave={false}>
                                                        <img k='1' src={k.img} alt="" />
                                                    </ReactCSSTransitionGroup>
                                                </LazyLoad >
                                            </div>
                                            <h4>{k.title}</h4>
                                            <p style={{ color: '#999' }}>{moment(k.createdate).endOf('day').fromNow()}</p>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul> : <Result
                            img={<img src={require('src/Style/svg/notice.svg')} />}
                            title="查找失败"
                            message="没有找到该主播的视频信息！"/>}
                </section>
            </section>
        )
    }
    
    componentWillUnmount() {
    }
}

export default template({
    id: 'anchorInfo',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

