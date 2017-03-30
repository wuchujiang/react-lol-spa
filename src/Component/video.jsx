import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import moment from 'moment';
import {Header,template, Tartab} from './common/mixin';
import { Button, Icon, Toast } from 'antd-mobile';
import _ from 'lodash';
class Main extends Component {
    constructor() {
        super();
        this.state = {
            getNewstVideos: {}
        }
    }

    componentWillMount() {
       
    }
    componentDidMount() {
        this.props.getVideoData(`http://infoapi.games-cube.com/GetNewstVideos?p=${1}`, null, (data) => {
            Toast.hide();
            this.setState({
                getNewstVideos: data
            });
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
        let getNewstVideos = this.state.getNewstVideos
        let newstVideos = !_.isEmpty(getNewstVideos) && getNewstVideos.data && getNewstVideos.data.length > 0 ? getNewstVideos.data : [];
        return (
            
            <section>
                <Header title="视频" />
                <ul className="video-page">
                    {
                        !_.isEmpty(newstVideos) && newstVideos.map((k ,i) => {
                        return (
                                <li key={i}>
                                    <Link>
                                        <div className="video-img">
                                            <img src={k.img} alt=""/>
                                            <div className="player-icon">
                                                <span className="player-icon-o"></span>
                                                <span className="player-icon-c"></span>
                                            </div>
                                        </div>
                                        <h4>{k.title}</h4>
                                        <p>{moment(k.createdate).endOf('day').fromNow()}</p>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        )
    }
    
    componentWillUnmount() {
    }
}

export default template({
    id: 'video',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

