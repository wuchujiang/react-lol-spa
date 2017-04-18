import React, {Component, PropTypes} from 'react';
import {History, Link } from 'react-router';
import { is, fromJS} from 'immutable';
import { Tool } from '../Config/Tool';
import {Header,template, Tartab} from './common/mixin';
import { Icon, Toast, List } from 'antd-mobile';
import _ from 'lodash';


class Main extends Component {
    constructor() {
        super();
        
    }

    componentWillMount() {
       
    }
    componentDidMount() {
       
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
   
    render() {
        return (
            <section style={{height: '100%'}}>
                <Header title="游戏资讯" />
                <iframe style={{position: 'absolute', border: 'none'}} frameborder="no" width='100%' height='100%' src={decodeURIComponent(this.props.location.query.src)}></iframe>
            </section>
        )
    }
    
    componentWillUnmount() {
    }
}

export default template({
    id: 'news',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

