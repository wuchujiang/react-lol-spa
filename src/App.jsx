import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Provider } from 'react-redux';
import route from './Router/Route'; //路由配置
import store from './Redux/Store/Store';
import './Config/Config.js';//引入默认配置
import _ from 'lodash';

import './Style/app.scss';
import './Style/search.scss';
import './Style/public.scss';
import './Style/areaList.scss';
import './Style/searchResult.scss';
import './Style/hero.scss';
import './Style/gameDetail.scss';
import './Style/summoner.scss';
import './Style/heroContent.scss';
import './Style/video.scss';
import './Style/anchors.scss';
import './Style/payMent.scss';




store.subscribe(() => { //监听state变化
    //console.log(store.getState())
});

render(
    <Provider store={store}>
		{route}
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);

