import React, {Component, PropTypes} from 'react';
import {History, Link } from 'react-router';
import { is, fromJS} from 'immutable';
import {Header,template, Tartab} from './common/mixin';
import {Icon, Result } from 'antd-mobile';
import PanelA from './hero/panelA';
import PanelB from './hero/panelB';
import { getRandInfo } from 'src/Config/staticData';


import _ from 'lodash';
import SwipeableViews from 'react-swipeable-views';
import className from 'classnames';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let progress = document.querySelectorAll('.item-progress');
        for (let i = 0; i < progress.length; i++){
            let label = progress[i].previousSibling.firstChild;
            
            if (label != null) {
                progress[i].style.transition = 'width .5s';
                setTimeout(() => {
                    progress[i].style.width = label.textContent.replace('胜', "");
                },1)            
            }
        }
    }

    getTotalData() {
        let battleSummaryInfo = this.props.requestData ? this.props.requestData.battleSummaryInfo : [];
        let summaryInfo = battleSummaryInfo.data && battleSummaryInfo.data.length > 0 ? battleSummaryInfo.data[0] : {};
        let batt_sum_info = summaryInfo.batt_sum_info || [];
        let total = {};
        /**
        * type1 匹配 2 人机  6大乱斗
        */
        for (let i = 0; i < batt_sum_info.length; i++){
            if (batt_sum_info[i].battle_type == 1) {
                total.type_1 = {
                    state: batt_sum_info[i].total_num > 0 ? true : false,
                    total_num: batt_sum_info[i].total_num - batt_sum_info[i].leave_num,
                    win_num: batt_sum_info[i].win_num,
                }
            } else if (batt_sum_info[i].battle_type == 6) {
                total.type_6 = {
                    state: batt_sum_info[i].total_num > 0 ? true : false,
                    total_num: batt_sum_info[i].total_num - batt_sum_info[i].leave_num,
                    win_num: batt_sum_info[i].win_num
                }
            }else if (batt_sum_info[i].battle_type == 2) {
                total.type_2 = {
                    state: batt_sum_info[i].total_num > 0 ? true : false,
                    total_num: batt_sum_info[i].total_num - batt_sum_info[i].leave_num,
                    win_num: batt_sum_info[i].win_num
                }
            }
        }
        return total;
    }
    
    getWinNumber() {
        let getTotalData = this.getTotalData();  //获取全部数据
        let total = {
            win_num: 0,
            total_num: 0
        };
        for (let k in getTotalData) {
            if (getTotalData[k].state) {
                total.win_num += getTotalData[k].win_num;
                total.total_num += getTotalData[k].total_num;
            }
        }
        return total;
    }

    /*
    * 判断用户是否有排位赛记录
    */
    isRank() {
        let getUserHotInfo = this.props.requestData ? this.props.requestData.getUserHotInfo : [];
        let battleSummaryInfo = this.props.requestData ? this.props.requestData.battleSummaryInfo : [];
        
        let userHotInfo = getUserHotInfo.data && getUserHotInfo.data.length > 0 ? getUserHotInfo.data[0] : [];
        let summaryInfo = battleSummaryInfo.data && battleSummaryInfo.data.length > 0 ? battleSummaryInfo.data : {};
        //小于30级 
        console.log(userHotInfo.level);
        if (userHotInfo.level < 30 || (userHotInfo.queue == 255 && userHotInfo.tier == 255)) {
            return false;
        }

        return true;
    }

    sortRankData(summaryInfo) {
        /*
        * 整理s7排位赛数据
        * type=4 s7单双排  =3 灵活组排；
        */
        let battle = {};
        let batt_sum_info = summaryInfo && summaryInfo.batt_sum_info ? summaryInfo.batt_sum_info : [];
        for (let i = 0; i < batt_sum_info.length;i++){
            if (batt_sum_info[i].battle_type == 4) {
                battle.type_4 = batt_sum_info[i];
            } else if (batt_sum_info[i].battle_type == 3) {
                battle.type_3 = batt_sum_info[i];
            }   
        }
        return battle;
    }

    getRankOldData(summaryInfo) {
        /*
        * 获取S3-S6的排位数据
            2 s6
            3 s5
            4 s4
            5 s3
        */
        let rank = [];
        for (let i = 2; i < summaryInfo.length; i++){
            if (summaryInfo[i].result == 0) {
                summaryInfo[i].batt_sum_info.title = `S${8 - i}排位赛`;
                rank.push(summaryInfo[i].batt_sum_info);
            }
        }
        return rank;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    componentWillUpdate(nextProps,nextState){
        if (this.props !== nextProps) {
            let {data} = nextProps.state;

        }
    }

    render() {
        console.log(this.props);
        let getUserData = this.props.requestData ? this.props.requestData.getUserData : {};
        let rankData = getUserData.data && getUserData.data.length > 0 ? getUserData.data : [];
        let battleSummaryInfo = this.props.requestData ? this.props.requestData.battleSummaryInfo : [];
        let summaryInfoAll = battleSummaryInfo.data && battleSummaryInfo.data.length > 0 ? battleSummaryInfo.data : [];
        let summaryInfo = summaryInfoAll[0];
        let winNumber = this.getWinNumber() || {};
        console.log(summaryInfo);
        let sortRankData = this.sortRankData(summaryInfo) || {};
        return (
        <section>
            <section className="honorInfo">
                <Header title="荣誉详情" />
                <h4>荣誉<span>?</span></h4>    
                <ul className="honor">
                    <li>
                        <div className="honor-icon">
                            <img src={require(`src/Style/img/${rankData[1] && rankData[1].god_like_num > 0 ? 'honor_god' : 'honor_god_disable'}.png`)} alt="" />
                            <span>{rankData[1] && rankData[1].god_like_num}次</span>
                        </div>
                        <p className="honor-name">超神</p>
                    </li>
                    <li>
                        <div className="honor-icon">
                            <img src={require(`src/Style/img/${rankData[1] && rankData[1].penta_kills > 0 ? 'honor_5_kill' : 'honor_5_kill_disable'}.png`)} alt="" />
                            <span>{rankData[1] && rankData[1].penta_kills}次</span>
                        </div>
                        <p className="honor-name">五杀</p>
                    </li><li>
                        <div className="honor-icon">
                            <img src={require(`src/Style/img/${rankData[1] && rankData[1].quadra_kills > 0 ? 'honor_4_kill' : 'honor_4_kill_disable'}.png`)} alt="" />
                            <span>{rankData[1] && rankData[1].quadra_kills}次</span>
                        </div>
                        <p className="honor-name">四杀</p>
                    </li><li>
                        <div className="honor-icon">
                            <img src={require(`src/Style/img/${rankData[1] && rankData[1].triple_kills > 0 ? 'honor_3_kill' : 'honor_3_kill_disable'}.png`)} alt="" />
                            <span>{rankData[1] && rankData[1].triple_kills}次</span>
                        </div>
                        <p className="honor-name">三杀</p>
                    </li><li>
                        <div className="honor-icon">
                            <img src={require(`src/Style/img/${rankData[3] && rankData[3].champion_num > 132 ? 'honor_all_heroes' : 'honor_all_heroes_disable'}.png`)} alt="" />
                            <span>{rankData[3] && rankData[3].champion_num}个</span>
                        </div>
                        <p className="honor-name">全英雄</p>
                    </li><li>
                        <div className="honor-icon">
                            <img src={require(`src/Style/img/${rankData[1] && rankData[1].length > 0 ? 'honor_continuous_win' : 'honor_continuous_win_disable'}.png`)} alt="" />
                            <span>10场</span>
                        </div>
                        <p className="honor-name">最高连胜</p>
                    </li><li>
                        <div className="honor-icon">
                            <img src={require(`src/Style/img/${rankData[2] && (rankData[2].total_match_mvps + rankData[2].total_rank_mvps) > 0 ? 'honor_mvp' : 'honor_mvp_disable'}.png`)} alt="" />
                            <span>{(rankData[2] && rankData[2].total_match_mvps + rankData[2].total_rank_mvps)}次</span>
                        </div>
                        <p className="honor-name">MVP</p>
                    </li><li>
                        <div className="honor-icon">
                            <img src={require(`src/Style/img/${rankData[1] && rankData[1].ward_placed_total > 0 ? 'honor_eye' : 'honor_eye_disable'}.png`)} alt="" />
                            <span>{rankData[1] && rankData[1].ward_placed_total}个</span>
                        </div>
                        <p className="honor-name">插眼</p>
                    </li><li>
                        <div className="honor-icon">
                            <img src={require(`src/Style/img/${rankData[1] && rankData[1].kills_total > 0 ? 'honor_many_kills' : 'honor_many_kills_disable'}.png`)} alt="" />
                            <span>{rankData[1] && rankData[1].kills_total}次</span>
                        </div>
                        <p className="honor-name">杀人</p>
                    </li><li>
                        <div className="honor-icon">
                            <img src={require(`src/Style/img/${rankData[1] && rankData[1].assists_total > 0 ? 'honor_assist' : 'honor_assist_disable'}.png`)} alt="" />
                            <span>{rankData[1] && rankData[1].assists_total}次</span>
                        </div>
                        <p className="honor-name">助攻</p>
                    </li>
                </ul>
            </section>
            <section className="honorInfo">
                <h4>战绩<span>?</span></h4>
                <ul className="chart">
                    <li className="chart-item">
                        <div className="item-l">
                            <h5>总局数</h5>
                            <p>{winNumber.total_num}场</p>    
                        </div>
                        <div className="item-r">
                             {winNumber.total_num == 0 ? <p>暂无战绩</p>: <p><label>胜{Math.round((winNumber.win_num/winNumber.total_num)*100)}%</label>
                                <span>{winNumber.win_num}场</span></p>}
                            <div className="item-progress do"></div>
                        </div>    
                    </li> 
                   <li className="chart-item">
                        <div className="item-l">
                            <h5>匹配赛</h5>
                            <p>{this.getTotalData().type_1 ? this.getTotalData().type_1.total_num : 0}场</p>    
                        </div>
                        <div className="item-r">
                            {this.getTotalData().type_1 && this.getTotalData().type_1.state ? <p><label>胜{Math.round((this.getTotalData().type_1.win_num/this.getTotalData().type_1.total_num)*100)}%</label><span>{this.getTotalData().type_1.win_num}场</span></p> : <p>暂无战绩</p>}        
                            <div className="item-progress"></div>
                        </div>    
                   </li> 
                    <li className="chart-item">
                        <div className="item-l">
                            <h5>大乱斗</h5>
                            <p>{this.getTotalData().type_6 ? this.getTotalData().type_6.total_num : 0}场</p>    
                        </div>
                        <div className="item-r">
                            {this.getTotalData().type_6 && this.getTotalData().type_6.state ? <p><label>胜{Math.round((this.getTotalData().type_6.win_num/this.getTotalData().type_6.total_num)*100)}%</label><span>{this.getTotalData().type_6.win_num}场</span></p> : <p>暂无战绩</p>}        
                            <div className="item-progress"></div>
                        </div>    
                   </li>
                    <li className="chart-item">
                        <div className="item-l">
                            <h5>人机</h5>
                            <p>{this.getTotalData().type_2 ? this.getTotalData().type_2.total_num : 0}场</p>    
                        </div>
                        <div className="item-r">
                            {this.getTotalData().type_2 && this.getTotalData().type_2.state ? <p><label>胜{Math.round((this.getTotalData().type_2.win_num/this.getTotalData().type_2.total_num)*100)}%</label><span>{this.getTotalData().type_2.win_num}场</span></p> : <p>暂无战绩</p>}        
                            <div className="item-progress"></div>
                        </div>    
                   </li> 
                </ul> 
            </section>
            <section className="honorInfo">
                    <h4>排位<span>?</span></h4>
                    {
                        !this.isRank() ? <div className="fail">
                            <div className="fail-img">
                                    <img src={require('src/Style/img/ali_cry_image.png')} alt=""/>
                                </div>
                                <p>您暂时还未打过排位赛</p>
                        </div>
                            : <ul className="rank-list">
                                {summaryInfo && summaryInfo.result == 0  ? <li>
                                    <div className="rank-list-l">
                                        <div className="rank-list-img"><img src={sortRankData.type_4.tier ? require(`src/Style/img/stage_${sortRankData.type_4.tier}.png`) : ""} alt="" /></div>
                                        <p>S7单双排</p>
                                    </div>
                                    <div className="rank-list-r">
                                        <h5>{getRandInfo(sortRankData.type_4)}</h5>
                                        <p>
                                            <label>总场次<span>{sortRankData.type_4.total_num - sortRankData.type_4.leave_num}</span></label>
                                            <label>胜点<span>{sortRankData.type_4.win_point}</span></label>
                                        </p>
                                        <div className="progress"> 
                                            <p><label>胜{sortRankData.type_4.total_num == 0 ? '0' : Math.round(sortRankData.type_4.win_num / (sortRankData.type_4.total_num - sortRankData.type_4.leave_num)*100)}%</label><span>{sortRankData.type_4.win_num}场</span></p>
                                            <div className="item-progress"></div>
                                        </div>
                                    </div>
                                </li> : ""}
                                {summaryInfo && summaryInfo.result == 0 ? <li>
                                    <div className="rank-list-l">
                                        <div className="rank-list-img"><img src={sortRankData.type_3.tier ? require(`src/Style/img/stage_${sortRankData.type_3.tier}.png`) : ""} alt="" /></div>
                                        <p>S7灵活组排</p>
                                    </div>
                                    <div className="rank-list-r">
                                        <h5>{getRandInfo(sortRankData.type_3)}</h5>
                                        <p>
                                            <label>总场次<span>{sortRankData.type_3.total_num - sortRankData.type_3.leave_num}</span></label>
                                            <label>胜点<span>{sortRankData.type_3.win_point}</span></label>
                                        </p>
                                        <div className="progress">
                                            <p><label>胜{sortRankData.type_3.total_num == 0 ? '0' : Math.round(sortRankData.type_3.win_num / (sortRankData.type_3.total_num - sortRankData.type_3.leave_num)*100)}%</label><span>{sortRankData.type_3.win_num}场</span></p>
                                            <div className="item-progress"></div>
                                        </div>
                                    </div>
                                </li> : ""}
                                {this.getRankOldData(summaryInfoAll).map((k, i) => {
                                    return (
                                        <li key={i}>
                                            <div className="rank-list-l">
                                                <div className="rank-list-img"><img src={k.tier ? require(`src/Style/img/stage_${k.tier}.png`) : ""} alt="" /></div>
                                                <p>{k.title}</p>
                                            </div>
                                            <div className="rank-list-r">
                                                <h5>{getRandInfo(k)}</h5>
                                                <p>
                                                    <label>总场次<span>{k.total_num - k.leave_num}</span></label>
                                                    <label>胜点<span>{k.win_point}</span></label>
                                                    <label>胜率<span>{k.total_num == 0 ? '0' : Math.round(k.win_num / (k.total_num - k.leave_num) * 100)}%</span></label>
                                                </p>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                    }    
                
            </section>    
        </section>
        )
    }
}

export default template({
    id: 'ability',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});