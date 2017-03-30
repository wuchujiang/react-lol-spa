import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';

import index from '../Component/index'; //销售录入

class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;



const search = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/search').default)
    },'search')
}

const areaList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/areaList').default)
    },'areaList')
}

const searchResult = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/searchResult').default)
    },'searchResult')
}

const hero = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/hero').default)
    },'hero')
}

const ability = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/ability').default)
    },'ability')
}

const gameDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/gameDetail').default)
    },'gameDetail')
}

const summoner = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/summoner').default)
    },'summoner')
}

const heroContent = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/heroContent').default)
    },'heroContent')
}

const video = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/video').default)
    },'video')
}

const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={Roots}>
            <IndexRoute component={index} />//首页
            <Route path="index" component={index} />
            <Route path="search" getComponent={search} /> //页面搜索
            <Route path="areaList" getComponent={areaList} /> //选择大区
            <Route path="searchResult" getComponent={searchResult} /> //选择大区
            <Route path="hero" getComponent={hero} />
            <Route path="ability" getComponent={ability} />
            <Route path="gameDetail" getComponent={gameDetail} />
            <Route path="summoner" getComponent={summoner} />
            <Route path="video" getComponent={video} />
            <Route path="heroContent" getComponent={heroContent} />
            <Redirect from='*' to='/'  />
        </Route>
    </Router>
);

export default RouteConfig;