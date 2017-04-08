import React, {Component} from 'react';
import _ from 'lodash';
import { Toast, SearchBar,Result, Icon } from 'antd-mobile';
import SummonerList from './summonerList';
import { is, fromJS} from 'immutable';

export default class PanelC extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchResult: [],
            searchState: false,
            searchValue: "",
            getAllSummoner: {}
        }
    }

    componentDidMount() {
        //http://cdn.tgp.qq.com/pallas/images/champions_id/79.png   79为key
        //http://cdn.tgp.qq.com/pallas/images/skins/original/79-000.jpg 皮肤背景
       //初始化数据
        Toast.loading('加载中', 0);
        this.props.getData(`/champion`, null, (data) => {
            Toast.hide();
            this.setState({
                getAllSummoner: data
            })
        });
    }

    changeHandle(value) {
        this.setState({
            searchValue: value
        });
       let data = this.state.getAllSummoner.data;
       let searchResult = [];
       for(let i=0;i<data.length;i++){
            if(data[i].title.indexOf(_.trim(value)) > -1 || data[i].cname.indexOf(_.trim(value)) > -1  ){
                searchResult.push(data[i].id)
            }
       }
       this.setState({
           searchResult: searchResult
       })
    }

    focusHandle() {
        this.setState({
            searchState: true
        })
    }

    blurHandle() {
        this.setState({
            searchState: false
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    render() {
        let summoners = !_.isEmpty(this.state.getAllSummoner) && this.state.getAllSummoner.data.length > 0 ? this.state.getAllSummoner.data : [];
        let searchResult = this.state.searchResult;
        let arr = [];
        for(let i=0;i<searchResult.length;i++){
            arr.push(_.filter(summoners, {id: searchResult[i]})[0]);
        }
        let {searchValue} = this.state;
        if((arr.length == 0 && !this.state.searchState) || this.state.searchValue == ""){
            arr = summoners;
        }
        
        return (
            <div>
                <SearchBar value={searchValue} onChange={ e => {this.changeHandle(e)}} onFocus={e => {this.focusHandle()}} onBlur={e=>{this.blurHandle()}} placeholder="搜索" />
                <div className="summoner-lists">
                    <ul>
                        {arr.length !== 0 ? arr.map((k, index) => {
                            return (                              
                                <SummonerList summonerClick={this.props.summonerClick} name={k.cname} title={k.title} tags={[]} keys={k.id} index={index}  key={_.uniqueId()} />
                            )
                        }) : this.state.searchState 
                            ?<Result
                            img={<img src={require('src/Style/svg/notice.svg')} />}
                            title="查找失败"
                            message="没有找到相关英雄，请重新再试！"/> 
                            : <div></div>}
                    </ul>
                </div>
            </div>
           
        )
    }
}
