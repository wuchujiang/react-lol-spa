import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { is, fromJS} from 'immutable';
import {Tool} from '../Config/Tool';
import {Header,template, Tartab} from './common/mixin';
import { Icon , Modal} from 'antd-mobile';
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
        let details = document.querySelector('.details');
        let navSpace = document.querySelector('.nav-space');
        let smallBar = document.querySelector('.small-bar');
        let tablist = document.querySelector('.am-tab-bar-bar');
        details.style.height = (window.innerHeight - navSpace.clientHeight- (tablist !== null ? tablist.clientHeight : 0 ) - smallBar.clientHeight) + 'px';

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
           index: index,
           checkRightContent: false
       })
    } 

    addDefault() {
        let {qquin, icon_id, name, area, level} = this.props.actions.searchClick;
        let userData = {
            qquin,
            area,
            vaid: this.props.actions.searchClick.area_id
        }
         Modal.alert('默认角色', '确定要设为默认吗???', [
            { text: '取消'},
            {
                text: '确定', onPress: () => { 
                    Tool.setLocationObj('userData', userData);
                    this.setState({
                        checkRightContent: true
                    })
            }, style: { fontWeight: 'bold' } },
        ])
    }

    getRightContent() {
        let userData = Tool.getLocationObj('userData');
        let qquin = this.props.location.query.qquin;
        let rightContent;
        
        if (qquin) {
            rightContent = <Icon key="1" type="ellipsis" />;
        } else {
            rightContent = <span onClick={e => { this.addDefault(); } }>添加默认</span>;
        }

        return rightContent;
    }

    render() {
        let areaCheck = this.props.actions.areaCheck;
        let index = this.state.index;
        return (
            <section>
                <Header title="英雄战绩" rightContent={!this.state.checkRightContent ? this.getRightContent() : <Icon key="1" type="ellipsis" />} />
                {!_.isEmpty(this.props.location.query.qquin) && <Tartab selected="3"/>}
                <nav className="small-bar">
                    <ul>
                        <li className={className({active: index === 0})} onClick={() => {this.handleChangeIndex(0)}}>战绩</li>
                        <li className={className({active: index === 1})} onClick={() => {this.handleChangeIndex(1)}}>能力</li>
                    </ul>
                </nav>
                <SwipeableViews resistance containerStyle={{height: '100%'}}   className="details" index={index} onChangeIndex={index => {this.handleChangeIndex(index)}}>
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