import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Tool} from '../Config/Tool';
import {Header,template, Tartab} from './common/mixin';
import { Button, Icon, Toast } from 'antd-mobile';
import Historical from './search/history';
import _ from 'lodash'; 

class Main extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
       
    }
    componentDidMount() {
        //回填本地搜索历史记录；
        // let history = Tool.getLocationObj('history');
        // if (this.props.actions.historial.length == 0) {
        //     this.props.historial(history);
        // }
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

    saveHistory() {
        if (_.isEmpty(this.props.actions.value)) {
            Toast.info('请输入查询名称', 2, null, false);
            return false;
        }
        if (_.isEmpty(this.props.actions.areaCheck)) {
            Toast.info('请选择大区名称', 2, null, false);
            return false;
        }
        let {id, name} = this.props.actions.areaCheck;
        this.props.historial({
            id,
            name,
            value: this.props.actions.value
        });
        //回填本地搜索历史记录；
        let history = Tool.getLocationObj('history');
        console.log(history);
        let historial = this.props.actions.historial;
        console.log(historial);
        
        let oldHistory = Tool.getLocationObj('history');    
        console.log(oldHistory);
        
        //如果刷新后redux里面的数据为空，第一次回填时需要把缓存里面的数据合并到redux；
        Tool.setLocationObj('history', historial.length === 1 ? historial.concat(oldHistory) : historial);
        this.context.router.push({
            pathname: "/search/searchResult",
            query: {
                keyword: this.props.actions.value
            }
        })
    }
   
    render() {
        let areaCheck = this.props.actions.areaCheck;
        return (
            <section className="content">
                <Header pathName="search" title="搜索"/>
                <section className="search-page">
                    <div className="input-info">
                        <input placeholder="请输入游戏名称" value={this.props.actions.value} onChange={e => {this.changeHandle(e)}} placeholder="请输入召唤师名称" />
                    </div>
                    <div onClick={e=>{}} className="input-info">
                        <Link to="/search/areaList">
                            <p className="check-info">{areaCheck.name || '选择区域'}</p>
                            <Icon type="down" />
                        </Link>
                    </div>
                    <div onClick={e => { this.saveHistory();}} className="btn btn-complete am-button am-button-primary" type="primary"><span>搜索</span></div>
                </section>
                <Historical {...this.props} />
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

Main.contextTypes = {
    router: PropTypes.object
}