import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { is, fromJS} from 'immutable';
import {Tool} from '../Config/Tool';
import {Header,template, Tartab} from './common/mixin';
import { Button, Icon } from 'antd-mobile';
import PanelA from './hero/panelA';
import PanelB from './hero/panelB';

import _ from 'lodash';
import SwipeableViews from 'react-swipeable-views';
import className from 'classnames';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            index: 0
        };
        this.handleChangeIndex = this.handleChangeIndex.bind(this);
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
   
    handleChangeIndex (index) {
       this.setState({
           index: index
       })
    } 

    addDefault() {
        // let {qquin, icon_id, name, area, level} = this.props.actions.searchClick;
        // let userData = {
        //     qquin,
        //     icon_id,
        //     name,
        //     area,
        //     level,
        //     vaid: this.props.actions.searchClick.area_id
        // }
    }

    render() {
        let areaCheck = this.props.actions.areaCheck;
        let index = this.state.index;
        return (
            <section>
                <Header title="英雄战绩" rightContent={<span onClick={e => { this.addDefault();}}>添加默认</span>} />
                <nav className="small-bar">
                    <ul>
                        <li className={className({active: index === 0})} onClick={() => {this.handleChangeIndex(0)}}>战绩</li>
                        <li className={className({active: index === 1})} onClick={() => {this.handleChangeIndex(1)}}>能力</li>
                    </ul>
                </nav>
                <SwipeableViews  className="details" index={index} onChangeIndex={index => {this.handleChangeIndex(index)}}>
                    <PanelA {...this.props} />
                    <PanelB />
                </SwipeableViews>
            </section>
        )
    }
    
    componentWillUnmount() {

    }
}

export default template({
    id: 'hero',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});