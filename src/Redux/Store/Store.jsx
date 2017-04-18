import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import * as reducer from '../Reducer/Index';
import thunk from 'redux-thunk';



//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。

let store;


//配置devtool工具
if(!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)){
    store = createStore(
        combineReducers(reducer),
        applyMiddleware(thunk)
    );
}else{
    store = createStore(
        combineReducers(reducer),
        compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //插件调试，未安装会报错
    );
}

export default store;