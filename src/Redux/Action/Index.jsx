import fetch from 'isomorphic-fetch'
import request from 'superagent';
import {Toast} from 'antd-mobile';
import {target} from '../../Config/Config'
import {Tool} from '../../Config/Tool'
import {token} from 'src/Config/staticData';
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

//开始获取数据
const requestPosts = path => {
    return {type: REQUEST_POSTS, path}
}

//获取数据成功
const receivePosts = (path, json) => {
    return {type: RECEIVE_POSTS, path, json}
}

// 页面初次渲染时获取数据
export const fetchPosts = (path, postData) => {
    let url = target + path + Tool.paramType(postData);
    return dispatch => {
        dispatch(requestPosts(postData));
        return fetch(url, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'DAIWAN-API-TOKEN': token.user
            }
        }).then(response => {
            if (response.ok) {
                response
                    .json()
                    .then(json => dispatch(receivePosts(path, json)))
            } else {
                console.log("status", response.status);
            }
        }).catch(error => console.log(error))
    }
}

//开始获取数据
const getDataStart = path => {
    return {type: GET_DATA_START, path}
}

//获取数据成功
const getDataSuccess = (path, json, success, name) => {
    return {type: GET_DATA_SUCCESS, path, json, success, name}
}

//手动调用获取数据的aciton
export const getData = (path, postData, success, name) => {
    let url = target + path + Tool.paramType(postData);
    return dispatch => {
        dispatch(getDataStart(postData));
        // return fetch(path, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'DAIWAN-API-TOKEN': token.user
        //     },
        //         mode: 'cors'
        //     })
        //     .then(response => response.json())
        //     .then(json => dispatch(getDataSuccess(path, json, success, name)))
        //     .catch(error => {
        //         Toast.hide();
        //         Toast.fail('网络连接错误！')
        //         console.log(error);
        //     })
        return request.get(path)
            .query(postData)
            .set('DAIWAN-API-TOKEN', token.user)
            .timeout(10000)
            .then(res => {
                let json = JSON.parse(res.text);
                dispatch(getDataSuccess(path, json , success, name));
            })
            .catch(err => {
                Toast.hide();
                Toast.fail('网络连接错误！')
                console.log(err);
            })
    }

    
}

//手动调用获取数据的aciton
export const getVideoData = (path, postData, success, name) => {
    let url = target + path + Tool.paramType(postData);
    return dispatch => {
        dispatch(getDataStart(postData))
        return fetch(path, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'DAIWAN-API-TOKEN': token.video
            },
                timeout: 8000,
                mode: 'cors'
            })
            .then(response => response.json())
            .then(json => dispatch(getDataSuccess(path, json, success, name)))
            .catch(error => {
                Toast.hide();
                Toast.fail('网络连接错误！')
                console.log(error);
            })
    }
}

//点击选中大区数据
export const areaCheck = (data = {}) => {
    return {type: AREACHECK, data}
}

//所有大区数据
export const areaList = (data = {}) => {
    return {type: AREALIST, data}
}

//搜索value
export const searchValue = (data = {}) => {
    return {type: SEARCHVALUE, data}
}

//点击搜索结果时，保存所选信息；
export const searchClick = (data = {}) => {
    return {type: SEARCHCLICK, data}
}

//点击游戏记录
export const gameFlag = (data = {}) => {
    return {type: GAMEFLAG, data}
}

//点击英雄
export const summonerClick = (data = {}) => {
    return {type: SUMMONERCLICK, data}
}

//记录搜索历史记录
export const historial = (param) => {
    return (dispatch, getState) => {
        let data = getState().historial;
        if (!Array.isArray(param)) {
            data.unshift(param);
        } else {
            data = data.concat(param);
        }
         
        return dispatch({
            type: SEARCH_HISTORIAL,
            data
        })
    }
}

//清空历史纪录
export const deleteHistory = (data = {}) => {
    return {type:DELETE_HISTORIAL, data: []}
}


