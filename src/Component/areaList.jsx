import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Tool} from '../Config/Tool';
import {Header,template, Tartab} from './common/mixin';
import { Button, Icon, Toast} from 'antd-mobile';
import _ from 'lodash';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            areaList: []
        }
    }

    componentWillMount() {
       
    }
    componentDidMount() {
        Toast.loading('加载中', 0);
        this.props.getData('http://lolapi.games-cube.com/Area', null, res => {
            Toast.hide();
            if(res.code == 0){
                console.log(res);
                this.setState({
                    areaList: res.data
                })
            }else{
                Toast.alert('系统异常');
            }
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    componentWillUpdate(nextProps,nextState){
        if (this.props !== nextProps) {
            let {data} = nextProps.state;

        }
    }

    clickHandle(obj) {
        this.props.areaCheck(obj);
    }
   
    render() {
        let {areaList} = this.state;
        let areaCheck = this.props.actions.areaCheck;
        return (
            <section>
                <Header title="选择大区" />
                <ul className="area-list">
                    {!_.isEmpty(areaList) && <li onClick={e => {this.clickHandle({id: 0, name: '全部区域'})}} key={0}>
                        <Link to='search'><span className={areaCheck.id === 0 ? "check" : "unCheck" }></span><p>全部区域</p></Link>
                    </li>}
                    {!_.isEmpty(areaList) && areaList.map((k, i) => {
                        return (
                            <li onClick={e => {this.clickHandle(k)}} key={i}>
                                <Link to='search'><span className={areaCheck.id === k.id ? 'check' : 'unCheck'} ></span><p>{k.name}  {k.isp}</p></Link>
                            </li>
                        )
                    })}
                </ul>
            </section>
           
        )
    }
    
    componentWillUnmount() {
    }
}

export default template({
    id: 'areaList',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

