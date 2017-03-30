import React, {Component} from 'react';
import {History, Link } from 'react-router';
import { is, fromJS} from 'immutable';
import {Header,template, Tartab} from './common/mixin';
import { Button, Icon } from 'antd-mobile';
import _ from 'lodash';
import PanelA from './summoner/PanelA';
import PanelC from './summoner/PanelC';

import className from 'classnames';
import SwipeableViews from 'react-swipeable-views';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };

        this.handleChangeIndex = this.handleChangeIndex.bind(this);
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

    handleChangeIndex(index) {
        this.setState({
            index: index
        })
    }
   
    render() {
        let index = this.state.index;
        return (
            <section>
                <Header title="英雄资料"/>
                <Tartab />
                <nav className="small-bar">
                    <ul>
                        <li className={className({ active: index === 0 })} onClick={() => { this.handleChangeIndex(0) } }>战绩</li>
                        <li className={className({ active: index === 1 })} onClick={() => { this.handleChangeIndex(1) } }>我的英雄</li>
                        <li className={className({ active: index === 2 })} onClick={() => { this.handleChangeIndex(2) } }>全部英雄</li>
                    </ul>
                </nav>
                <SwipeableViews className="details" index={index} onChangeIndex={index => { this.handleChangeIndex(index) } }>
                    <div>
                       <PanelA {...this.props} />
                    </div>
                    <div>
                       2323
                    </div>
                    <div>
                       <PanelC {...this.props} />
                    </div>
                </SwipeableViews>
            </section>
        )
    }
    
    componentWillUnmount() {
    }
}

export default template({
    id: 'summoner',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

