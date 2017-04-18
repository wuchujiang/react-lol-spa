import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';

import {Header,template, Tartab} from './common/mixin';
let pageIndex = 1;
class Main extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentWillMount() {
       
    }
   

    componentDidMount() { 
        let iframe = document.getElementsByTagName('iframe')[0];
        let navSpace = document.querySelector('.nav-space');
        iframe.style.height = (window.innerHeight - navSpace.clientHeight) + 'px';
        iframe.style.display = 'block';
        iframe.style.width = '100%';
        iframe.setAttribute('frameborder', 'no');
    }

     componentDidUpdate() {

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
        return (
            <section>
                <Header title="正在播放" />
                <div dangerouslySetInnerHTML={{__html: decodeURIComponent(this.props.location.query.content)}} />
            </section>
        )
    }
    
    componentWillUnmount() {
    }
}

export default template({
    id: 'player',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

