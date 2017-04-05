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
        }
    }

    componentWillMount() {
       
    }
   

    componentDidMount() { 
        
    }

     componentDidUpdate() {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    componentWillUpdate(nextProps,nextState){
        if (this.props !== nextProps) {
            let {data} = nextProps.state;

        }
    }

   
    render() {
        let videos = this.state.initData;
        return (
            
            <section>
                <Header title="视频" />
                <div>player</div>
            </section>
        )
    }
    
    componentWillUnmount() {
    }
}

export default template({
    id: 'player',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

