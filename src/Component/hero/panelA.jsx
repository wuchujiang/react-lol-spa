import React, { Component } from 'react';
import { getRandInfo } from 'src/Config/staticData';
import {Link} from 'react-router';
import { Icon,Toast } from 'antd-mobile';
import Record from './record';

export default class panelA extends Component{
    constructor(props) {
        super(props);
        this.state = {
            getUserData: {},
            battleSummaryInfo: {},
            getCombatList: {},
            getUserHotInfo: {}
        }
    }
    componentDidMount() {
        let {qquin} = this.props.actions.searchClick;
        let vaid =  this.props.actions.searchClick.area_id;
        this.props.getData(`http://lolapi.games-cube.com/CombatList?qquin=${qquin}&vaid=${vaid}`, null, res => {
            if(res.code == 0){
                this.setState({
                    getCombatList: res
                })

            }else{
                Toast.fail('系统异常')
            }
        }, 'getCombatList');

        this.props.getData(`http://lolapi.games-cube.com/UserExtInfo?qquin=${qquin}&vaid=${vaid}`, null, res => {
                if(res.code == 0){
                    this.setState({
                        getUserData: res
                    })
    
                }else{
                    Toast.fail('系统异常')
                }
            }, 'getUserData');

        this.props.getData(`http://lolapi.games-cube.com/BattleSummaryInfo?qquin=${qquin}&vaid=${vaid}`, null, res => {
            if(res.code == 0){
                this.setState({
                    battleSummaryInfo: res
                })

            }else{
                Toast.fail('系统异常')
            }
        }, 'battleSummaryInfo');

        this.props.getData(`http://lolapi.games-cube.com/UserHotInfo?qquin=${qquin}&vaid=${vaid}`, null, res => {
            if(res.code == 0){
                this.setState({
                    getUserHotInfo: res
                })

            }else{
                Toast.fail('系统异常')
            }
        }, 'getUserHotInfo');
    }

    pentaKillsState() {
        //如果存在5杀，就渲染，否则默认只显示4杀和3杀；
        let getUserData = this.state.getUserData;
        let state = false;
        let rankData = getUserData.data && getUserData.data.length > 0 ? getUserData.data : [];
        if (rankData[1] && rankData[1].penta_kills > 0) {
            state = true;
        }

        return state;
    }

    getKillsImg(item) {
        let kill = "";
        let quadra = "";
        if (item == 4) {
            quadra = 'quadra_kills';
        } else {
            quadra = 'triple_kills';
        }
        let {getUserData} = this.state;
        let rankData = getUserData.data && getUserData.data.length > 0 ? getUserData.data : [];
        if (this.pentaKillsState() && item == 4) {
            kill = 'honor_5_kill';
        } else {
            
            if (rankData[1]) {
                if (rankData[1][quadra] > 0) {
                    kill = `honor_${item}_kill`;
                }else{
                    kill = `honor_${item}_kill_disable`;
                }
            } else {
                kill = `honor_${item}_kill_disable`;
            }
        }
        return kill;
    }


    getTotalData() {
        let battleSummaryInfo = this.state.battleSummaryInfo;
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
    
    render() {
        let {getUserHotInfo, getUserData, getCombatList} = this.state;
        let {qquin, icon_id, name, area, level} = this.props.actions.searchClick;
        let rankData = getUserData.data && getUserData.data.length > 0 ? getUserData.data : [];
        let userHotInfo = getUserHotInfo.data && getUserHotInfo.data.length > 0 ? getUserHotInfo.data[0] : {};
        let winNumber = this.getWinNumber() || {};
        let combatList = getCombatList.data && getCombatList.data.length > 0 ? getCombatList.data[0] : {};
        return (
            <div className="record">
                <div className="banner">
                    <div className="record-l">
                        <div className="user-info-l">
                            <img src={`http://cdn.tgp.qq.com/lol/images/resources/usericon/${icon_id}.png`} alt=""/>
                            <span className="level">{level}</span>
                        </div>
                        <div className="user-info-r">
                            <p className='user-name'>{name}</p>
                            <p className="user-area">{area}</p>
                        </div>
                    </div>
                    <div className="record-r">
                        <span><Icon type="like" /></span>
                        <p>{userHotInfo.power_value}</p>
                    </div>
                </div>
                <div className="rank">
                    <div className="rank-l">
                        <div className="rank-img">
                            <img style={{width: userHotInfo.tier == 255 ? '70%' : '100%'}} src={userHotInfo.tier ? require(`src/Style/img/stage_${userHotInfo.tier}.png`) : ""} alt=""/>    
                        </div>
                        <p>{getRandInfo(userHotInfo)}</p>
                    </div>
                    <Link className="rank-r" to="ability">
                        <div className="rank-number">
                            <p>胜率<span>{winNumber.total_num == 0 ? '无' : Math.round((winNumber.win_num / winNumber.total_num) * 100) + '%'}</span></p>
                            <p>总局数<span>{winNumber.total_num}场</span></p>
                        </div>
                        <div className="win-number">
                            <div className="items">
                                <div className="items-icon">
                                    <img src={require(`src/Style/img/${rankData[1] && rankData[1].god_like_num > 0 ? "honor_god" : "honor_god_disable"}.png`)} alt=""/>
                                    <span className="times">{rankData[1] && rankData[1].god_like_num}次</span>
                                </div>
                                <p>超神</p>
                            </div>
                            <div className="items">
                                <div className="items-icon">
                                    <img src={require(`src/Style/img/${this.getKillsImg(4)}.png`)} alt=""/>
                                    <span className="times">{this.pentaKillsState() ? rankData[1] && rankData[1].penta_kills : rankData[1] && rankData[1].quadra_kills}次</span>
                                </div>
                                <p>{this.pentaKillsState() ? '五杀' : '四杀'}</p>
                            </div>
                            <div className="items">
                                <div className="items-icon">
                                    <img src={require(`src/Style/img/${this.getKillsImg(3)}.png`)} alt=""/>
                                    <span className="times">{this.pentaKillsState() ? rankData[1] && rankData[1].quadra_kills : rankData[1] && rankData[1].triple_kills}次</span>
                                </div>
                                <p>{this.pentaKillsState() ? '四杀' : '三杀'}</p>
                            </div> 
                        </div>
                        <Icon type="right" />
                    </Link>
                </div>
                <div className="record-list">
                <section>
                    <h4>我的战绩</h4>    
                    {
                        combatList.result != 0 || combatList.total_num <= 0 ?
                            <div className="fail">    
                                <div className="fail-img">
                                    <img src={require('src/Style/img/ali_cry_image.png')} alt=""/>
                                </div>
                                <p>仅记录半年且500场以内的战绩</p>
                            </div>
                            : <Record {...this.props} combatList={combatList}  />
                    }
                </section>    
                   
                </div>
            </div>
        )
    }
}