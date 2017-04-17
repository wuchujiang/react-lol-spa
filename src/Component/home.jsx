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

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    componentWillUpdate(nextProps,nextState){
        if (this.props !== nextProps) {
            let {data} = nextProps.state;

        }
    }

    clickHandle() {
         
    }
   
    render() {
        return (
            <section>
                <Header title="我的"/>
                <Tartab selected="3"/>
                <div className="app">
                    <div className="search">
                        <img src={require('src/Style/img/battle.png')} />
                    </div>
                    <p>添加游戏角色，查战绩，看英雄！</p>
                    <div className="btn-father">
                        <Link to="search"><div to="/search" onClick={() => {this.clickHandle();}} className="btn btn-search am-button am-button-primary" type="primary"><span>点击添加</span></div></Link>
                    </div>
                </div>
            </section>
        )
    }
    
    componentWillUnmount() {
    }
}

export default template({
    id: 'home',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

