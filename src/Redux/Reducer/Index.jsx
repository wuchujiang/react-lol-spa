import Immutable from 'immutable'

import {
    REQUEST_POSTS,
    RECEIVE_POSTS,
    GET_DATA_START,
    GET_DATA_SUCCESS,
    AREACHECK,
    AREALIST,
    SEARCHVALUE,
    SEARCHCLICK,
    GAMEFLAG,
    SUMMONERCLICK,
    SEARCH_HISTORIAL,
    DELETE_HISTORIAL
} from '../types';

//const initialState = Immutable.fromJS({}) //=Immutable.Map({})

const defaultlState = Immutable.fromJS({data: {}, isFetching: false})
//首次渲染时获取数据
export const fetchData = (state = defaultlState, action = {}) => {
    switch (action.type) {
        case REQUEST_POSTS:
            return state.set('isFetching', true);
        case RECEIVE_POSTS:
            return Immutable.Map({'data': action.json, 'isFetching': false}); //返回一个新的state
        default:
            return state
    }
}

//手动获取数据
export const requestData = (state = {}, action = {}) => {
    switch (action.type) {
        case GET_DATA_START:
            return state;
        case GET_DATA_SUCCESS:
            action.success(action.json);
            state[action.name] = action.json;
            return state;
        default:
            return state;
    }
}

// 记录商品列表页数据状态 export const producRecord = (state = {obj: 1}, action = {}) => {
//   switch(action.type){         case RECORD_STATE:             return
// Object.assign({},state,action);         case SAVE_PRODUCT_LIST:
// state['productList'] = [...action.productList];             return state;
//   //记录商品列表数据，但是不触发组件更新         case NEW_PRODUCT_DATA:
// state['productData'] = [...action.productData];             return state;
//     default:             return state     } }

export const areaCheck = (state = {}, action = {}) => {
    switch (action.type) {
        case AREACHECK:
            return action.data
        default:
            return state;
    }
}

export const areaList = (state = {}, action = {}) => {
    switch (action.type) {
        case AREALIST:
            return action.data
        default:
            return state;
    }
}

//分发所有的value
export const value = (state = '', action = {}) => {
    switch (action.type) {
        case SEARCHVALUE:
            return action.data
        default:
            return state;
    }
}

export const searchClick = (state = {}, action = {}) => {
    switch (action.type) {
        case SEARCHCLICK:
            return action.data
        default:
            return state;
    }
}

export const gameFlag = (state = {}, action = {}) => {
    switch (action.type) {
        case GAMEFLAG:
            return action.data
        default:
            return state;
    }
}

export const summonerClick = (state = {}, action = {}) => {
    switch (action.type) {
        case SUMMONERCLICK:
            return action.data
        default:
            return state;
    }
}

export const historial = (state = [], action = {}) => {
    switch (action.type) {
        case SEARCH_HISTORIAL:
            return action.data
        case DELETE_HISTORIAL:
            return action.data;    
        default:
            return state;
    }
}
