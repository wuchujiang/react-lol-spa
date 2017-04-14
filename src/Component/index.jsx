import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import { Tool } from '../Config/Tool';
import moment from 'moment';
import {Header,template, Tartab} from './common/mixin';
import { Icon, Toast, List } from 'antd-mobile';
import _ from 'lodash';
import LazyLoad from 'react-lazyload';
import PullView from './common/pullView';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
moment.locale('zh-cn');
const Item = List.Item;
let pageIndex = 0;

class Main extends Component {
    constructor() {
        super();
        this.state = {
            scrollState: 0,  // 1可以加载 2 加载中 3加载完成 4 没有内容了；
            initData: [],
            loadingTip: "查看更多"
        };
    }

    componentWillMount() {
       
    }
    componentDidMount() {
        Toast.loading('加载中', 0);
        this.props.getData(`/getNews?page=${pageIndex}`, null, (data) => {
            Toast.hide();
            if (data.list && data.list.length > 0) {
                this.setState({
                    initData: data.list
                })
            } else {
                Toast.fail('网络错误');
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

    scrollBottom() {
        //滑动到底部时加载；
        if (this.state.scrollState == 0 || this.state.scrollState == 1) {
            this.setState({
                scrollState: 2,
                loadingTip: '正在加载中'
            });
            let p = ++pageIndex;
            this.props.getVideoData(`/getNews?page=${p}`, null, (data) => {
                if (data.list && data.list.length > 0) {
                    let initData = this.state.initData;
                    this.setState({
                        initData: initData.concat(data.list),
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

    initPv(num) {
        let str = "";
        if (num > 1000) {
            str = (num / 10000).toFixed(2) + "万";
        } else {
            str = num;
        }
        return str;
    }
   
    render() {
        let initData = this.state.initData;
        return (
            <section>
                <Header iconName={false} title="首页"/>
                <Tartab selected="0"/>
                <div className="news">
                <PullView onScrollToBottom={() => {this.scrollBottom()}}>    
                    <List className="my-list">
                        {
                            !_.isEmpty(initData) && initData.map((k, i) => {
                                return (
                                    <Item
                                        key={i}    
                                        onClick={() => {}}
                                        platform="android">
                                        <div className="news-item">
                                            <div className="news-img">
                                                <LazyLoad debounce={500}  offset={100} placeholder={<img src={require('src/Style/img/img_fail_middle.png')} />}>
                                                    <ReactCSSTransitionGroup key='1'
                                                        transitionName="fade"
                                                        transitionAppear={true}
                                                        transitionAppearTimeout={500}
                                                        transitionEnter={false}
                                                        transitionLeave={false}>
                                                        <img k={1} src={k.image_url_small} alt=""/>
                                                    </ReactCSSTransitionGroup>
                                                </LazyLoad >    
                                            </div>    
                                            <div className="news-content">
                                                <h4>{k.title}</h4>
                                                <p>{k.summary}</p>
                                                <div className="news-time">
                                                    <span className="news-timers">{moment(k.createdate).endOf('day').fromNow()}</span>
                                                    <span className="news-pv">{this.initPv(k.pv)}阅</span>
                                                </div>
                                            </div>
                                            <Icon className="icon-right" type="right" />
                                        </div>
                                        </Item> 
                                )
                        })}    
                           
                    </List>
                </PullView>
                {this.state.scrollState !=0 && <div className="scroll-loading">
                    <p>
                        {this.state.scrollState == 2 ? <Icon type="loading" /> : ""}    
                        {this.state.loadingTip}
                    </p>
                </div>}
                <div className="bottom-space"></div>
                </div>
            </section>
        )
    }
    
    componentWillUnmount() {
    }
}

export default template({
    id: 'index',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

