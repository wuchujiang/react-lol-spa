import React, {Component} from 'react';
import _ from 'lodash';
import {defaultSummoner, occupation} from 'src/Config/staticData';
import { Toast, Flex, WhiteSpace } from 'antd-mobile';
import SummonerList from './summonerList';
import { is, fromJS} from 'immutable';

export default class PanelA extends Component{
    constructor(props){
        super(props);
        this.state = {
            getSummonerData: {}
        }
    }

    componentDidMount() {
        //http://cdn.tgp.qq.com/pallas/images/champions_id/79.png   79为key
        //http://cdn.tgp.qq.com/pallas/images/skins/original/79-000.jpg 皮肤背景
       //初始化数据
        Toast.loading('加载中', 0);
        this.props.getData(`http://lolapi.games-cube.com/Free`, null, (data) => {
            Toast.hide();
            this.setState({
                getSummonerData: data
            })
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    render() {
        let summonerList = this.state.getSummonerData && this.state.getSummonerData.data &&  this.state.getSummonerData.data.length > 0 ? this.state.getSummonerData.data[0] : [];
        let summonerArr = _.values(summonerList) || [];

        let summoners = summonerArr.concat(defaultSummoner);
        return (
            <div className="planA">
               <h5 className="desrible">更新时间:每周五中午</h5>
               <div className="summoner-lists">
                    <ul>
                        {!_.isEmpty(summonerList) ? summoners.map((k, index) => {
                            return (                              
                                <SummonerList summonerClick={this.props.summonerClick} name={k.name} title={k.title} tags={k.tags} keys={k.key} index={index}  key={_.uniqueId()} />
                            )
                        }) : <div></div>}
                    </ul>
               </div>
            </div>
        )
    }
}
