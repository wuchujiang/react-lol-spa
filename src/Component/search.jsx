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
        this.props.searchValue(e.target.value);
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
        let areaCheck = this.props.actions.areaCheck;
        return (
            <section className="content">
                <Header title="搜索"/>
                <section className="search-page">
                    <div className="input-info">
                        <input value={this.props.actions.value} onChange={e => {this.changeHandle(e)}} placeholder="请输入召唤师名称" />
                    </div>
                    <div onClick={e=>{}} className="input-info">
                        <Link to="/areaList">
                            <p className="check-info">{areaCheck.name || '选择区域'}</p>
                            <Icon type="down" />
                        </Link>
                    </div>
                    <Link to={{
                                pathname: `/searchResult`,
                                query: {
                                    keyword: this.props.actions.value
                                }
                            }}><Button className="btn btn-complete" type="primary">搜索</Button></Link>
                </section>
            </section>
        )
    }
    
    componentWillUnmount() {

    }
}

export default template({
    id: 'search',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});