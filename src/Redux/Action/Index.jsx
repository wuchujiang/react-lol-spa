import fetch from 'isomorphic-fetch'
import {target} from '../../Config/Config'
import {Tool} from '../../Config/Tool'
import {token} from 'src/Config/staticData';
import {
    SET_STATE,
    RECORD_STATE,
    SAVE_PRODUCT_LIST,
    NEW_PRODUCT_DATA,
    DELETE_ITEM,
    REQUEST_POSTS,
    RECEIVE_POSTS,
    GET_DATA_START,
    GET_DATA_SUCCESS,
    TEST_DISPATCH,
    TESTDATA,
    AREACHECK
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
            "Content-Type": "application/json"
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

//记录单个商品列表状态
export const recordState = (id, chooseState, num, index) => {
    return {type: RECORD_STATE, id, chooseState, num, index}
}

//将商品列表保存在store中，组件再次渲染时调用
export const saveProductlist = productList => {
    return {type: SAVE_PRODUCT_LIST, productList}
}

//保存商品列表也获取到的数据
export const newProductData = productData => {
    return {type: NEW_PRODUCT_DATA, productData}
}

//销售列表页删除单个item
export const deleteItem = index => {
    return {type: DELETE_ITEM, index}
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
        dispatch(getDataStart(postData))
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'DAIWAN-API-TOKEN': token.user
            },
                mode: 'cors'
            })
            .then(response => response.json())
            .then(json => dispatch(getDataSuccess(path, json, success, name)))
            .catch(error => console.log(error))
    }
}

//记录单个商品列表状态
export const testAction = (data) => {
    return {type: TEST_DISPATCH, data}
}

export const testDatass = (data = 1) => {
    console.log(data);
    return {type: TESTDATA, data}
}

export const areaCheck = (data = {}) => {
    return {
        type: AREACHECK,
        data
    }
}
