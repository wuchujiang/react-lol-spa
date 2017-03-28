import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Tool} from '../Config/Tool';
import {Header,template, Tartab} from './common/mixin';
import { Button, Icon } from 'antd-mobile';
import _ from 'lodash';

class Main extends Component {
    constructor() {
        super();
       
    }

    componentWillMount() {
       
    }
    componentDidMount() {
   
    }

    changeHandle(e) {
       
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    componentWillUpdate(nextProps,nextState){
        console.log(121)
        if (this.props !== nextProps) {
            let {data} = nextProps.state;
            console.log(data);
        }
    }
   
    render() {
        return (
            <section className="content">
                <Header title="搜索结果"/>
            </section>
        )
    }
    
    componentWillUnmount() {

    }
}

export default template({
    id: 'searchResult',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: 'http://lolapi.games-cube.com/Area'
});