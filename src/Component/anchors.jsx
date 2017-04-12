import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Tool} from '../Config/Tool';
import {Header,template, Tartab} from './common/mixin';
import { Icon, List, Toast } from 'antd-mobile';
import _ from 'lodash';
const Item = List.Item;
class Main extends Component {
    constructor() {
        super();
        this.state = {
            anchors: []
        }
    }

    componentWillMount() {
       
    }

    componentDidMount() {
        Toast.loading('加载中', 0);
        this.props.getVideoData(`/GetAuthors`, null, (data) => {
            Toast.hide();
            if (data.code == 0) {
                this.setState({
                   anchors: data.data
               })
            } else {
                Toast.fail('系统错误！');
           }
        });
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
        let anchors = this.state.anchors;
        return (
            <section>
                <Header title="全部主播"/>
                <section className="anchors">
                    <List className="my-list">
                        {
                            anchors.map((k, i) => {
                                return (
                                <Link className="anchors-link" key={i} to={{
                                        pathname: `video/anchorInfo`, query: {
                                            id: k.id,
                                            name: k.name,
                                            content: k.desc,
                                            img: k.img
                                        }
                                    }}>
                                <Item
                                    key={i}
                                    arrow="horizontal"
                                    multipleLine
                                    onClick={() => {}}
                                    platform="android"
                                    >
                                        <div className="anthors-wrap">
                                            <div className="anthors-img">
                                                <img src={k.img} alt=""/>
                                            </div>
                                            <p>{k.name}</p>
                                            <span>{k.videonum}个视频</span>
                                        </div>        
                                   
                                </Item>
                                 </Link>        
                            )
                        })
                    }
                    </List>
                </section>
            </section>
        )
    }
    
    componentWillUnmount() {
    }
}

export default template({
    id: 'anchors',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

