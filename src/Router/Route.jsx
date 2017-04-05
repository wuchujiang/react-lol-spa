import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import index from '../Component/index';

class Roots extends Component {
    render() {
        return (
            <ReactCSSTransitionGroup
                component="div"
                className="transition-wrapper"
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                {React.cloneElement(this.props.children, {
                    key: this.props.location.pathname
                })}
                </ReactCSSTransitionGroup>
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

const home = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/home').default)
    },'home')
}

const player = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/player').default)
    },'player')
}


const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={Roots}>
            <IndexRoute component={index} />//首页
            <Route path="index" component={index} />
            <Route path="hero" getComponent={hero} />
            <Route path="ability" getComponent={ability} />
            <Route path="gameDetail" getComponent={gameDetail} />
            <Route path="summoner" getComponent={summoner} />
            <Route path="hero" component={Roots} >
                <IndexRoute getComponent={hero} />//首页
                <Route path="ability" getComponent={ability} />
                <Route path="gameDetail" getComponent={gameDetail} />
            </Route>
            <Route path="search" component={Roots} >
                <IndexRoute getComponent={search} />//首页
                <Route path="areaList" getComponent={areaList} />
                <Route path="searchResult" getComponent={searchResult} />
            </Route>
            <Route path="video" component={Roots} >
                <IndexRoute getComponent={video} />//首页
                <Route path="player" getComponent={player} />
            </Route>
            <Route path="heroContent" getComponent={heroContent} />
            <Route path="home" getComponent={home} />
            <Redirect from='*' to='/' />
        </Route>
    </Router>
);

export default RouteConfig;