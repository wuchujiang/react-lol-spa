import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Tool} from '../Config/Tool';
import {Header,template, Tartab} from './common/mixin';
import { Button, Icon, Result, Toast } from 'antd-mobile';
import _ from 'lodash';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            searchResult: [],
            areaData: [],
            requestState: false
        }
       
    }

    componentWillMount() {
       
    }
    componentDidMount() {
        this.getAreaData().then((data) => {
            
            return this.getSearchResult(data);
        }).catch(err => {
            Toast.hide();
            Toast.fail(err, 2);
        })
    }
        

    changeHandle(e) {
       
    }

    getSearchResult(area) {
        return new Promise((resolve, reject) => {
            this.props.getData(`http://lolapi.games-cube.com/UserArea?keyword=${this.props.location.query.keyword}`, null, res => {
                if(res.code == 0){
                    let searchData = res.data;
                    if (searchData && searchData.length > 0) {
                        //根据id筛选出对应大区的玩家
                        let id = this.props.actions.areaCheck.id;
                        let results = [];
                        if (id == 0) {
                            //筛选出所有的玩家;
                            results = searchData;
                        } else {
                            for (let i = 0; i < searchData.length; i++) {
                                if (id == searchData[i].area_id) {
                                    results.push(searchData[i]);
                                    break;
                                }
                            }
                        }
                        console.log(results);
                        
                        this.setState({
                            searchResult: results,
                            requestState: true
                        })
                    }
                }else{
                    reject('系统异常')
                }
            }); 
        })
    }

    getAreaData() {
        return new Promise((resolve, reject) => {
            this.props.getData('http://lolapi.games-cube.com/Area', null, res => {
                if(res.code == 0){
                    this.setState({
                        areaData: res.data
                    })
                    resolve("");
                }else{
                    reject('系统异常')
                }
            });
        })
    }

    getUserArea(id) {
        let data = this.state.areaData;
        let area = "";
        for (let i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                area = data[i].name;
                break;
            }
        }
        return area;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    componentWillUpdate(nextProps,nextState){
        if (this.props !== nextProps) {
            let {data} = nextProps.state;
            console.log(data);
        }
    }

    clickHandle(item, i) {
        let temp = _.assign(item, i)
        this.props.searchClick(temp);
    }
   
    render() {
        let {searchResult, requestState} = this.state;
        searchResult.sort((a, b) => {
            return a.area_id - b.area_id;
        });
        return (
            <section className="content">
                <Header title="搜索结果"/>
                <div className="search-result">
                {searchResult.length > 0
                    ? searchResult.map((k, i) => {
                        return (
                            <div key={i} onClick={e => {this.clickHandle(k, {area: this.getUserArea(k.area_id)})}}>
                            <Link
                                
                                to={{
                                pathname: `/hero`
                            }}>
                                <section className="search-result-list">
                                    <div className="search-result-l">
                                        <img
                                            src={`http://cdn.tgp.qq.com/lol/images/resources/usericon/${k.icon_id}.png`}
                                            alt=""/>
                                    </div>
                                    <div className="search-result-r">
                                        <h5>{k.name}</h5>
                                        <p>{this.getUserArea(k.area_id)}
                                            <span>等级{k.level}</span>
                                        </p>
                                    </div>
                                    <Icon type='right'/>
                                </section>
                            </Link>
                            </div>
                        )
                    })
                    : requestState ? <Result
                        img={< img src = {
                        require('src/Style/svg/fail.svg')
                    }
                    className = "icon" />}
                        title="没有找到相关数据"
                        message="请重新输入正确的英雄名称"/> : ""
                }
            </div>
            </section>
        )
    }
    
    componentWillUnmount() {

    }
}

export default template({
    id: 'searchResult',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});