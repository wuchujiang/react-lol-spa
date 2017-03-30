import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Tool} from '../Config/Tool';
import moment from 'moment';
import { game_type } from 'src/Config/staticData';
import {Header,template} from './common/mixin';
import { Button, Icon, Accordion, Toast } from 'antd-mobile';
import className from 'classnames';
import _ from 'lodash';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameDetail: {}
        }
    }

    componentWillMount() {
       
    }
    componentDidMount() {
        let {qquin, vaid, game_id} = this.props.actions.gameFlag;
        Toast.loading('加载中', 0);
        this.props.getData(`http://lolapi.games-cube.com/GameDetail?qquin=${qquin}&vaid=${vaid}&gameid=${game_id}`, null, (data) => {
            Toast.hide();
            this.setState({
                gameDetail: data
            })
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    componentWillUpdate(nextProps,nextState){
        if (this.props !== nextProps) {
            let {data} = nextProps.state;

        }
    }

    getTotalNum(item) {
        let data = {
            totalKill: 0,
            death: 0,
            assists: 0,
            gold:0
        }
        for (let i = 0; i < item.length; i++){
            data.totalKill += item[i].champions_killed;
            data.death += item[i].num_deaths;
            data.assists += item[i].assists;
            data.gold += item[i].gold_earned;
        }

        return data;
    }

    sortGameRecords(gameDetail) {
        let temp = [[], []];
        let qquin = this.props.actions.searchClick.qquin;
        let gamer_records = gameDetail.gamer_records;
        for (let i = 0; i < gamer_records.length; i++){

            //将胜利方放在上面，切将自己放在第一位
            if (gamer_records[i].win == 1) {
                if (gamer_records[i].qquin == qquin) {
                    temp[0].unshift(gamer_records[i]);
                } else {
                    temp[0].push(gamer_records[i]);
                }
            } else {
                if (gamer_records[i].qquin == qquin) {
                    temp[1].unshift(gamer_records[i]);
                } else {
                    temp[1].push(gamer_records[i]);
                }
            }
        }
        console.log(temp);
        return temp
    }
   
    render() {
        let gameDetail = this.state.gameDetail.data && this.state.gameDetail.data.length > 0 ? this.state.gameDetail.data[0].battle : {};
        let qquin = this.props.actions.searchClick.qquin;
        console.log(gameDetail);
        return (
            <div className="game-detail">
                <Header title="战绩详情" />
                <header>
                    <div className="header-fixed"><div className="start-time">
                        开始时间<span>{moment(gameDetail.start_time).format('HH:mm')}</span>
                    </div>
                    <div className="total-time">
                        总时长<span>{Math.round((moment(gameDetail.stop_time)-moment(gameDetail.start_time))/60000)}分钟</span>
                    </div>
                    <div className="game-type">
                        模式<span>{game_type(gameDetail.game_type)}</span>
                    </div>
                    </div>    
                </header>
                <section>
                    {
                        gameDetail.area_id && this.sortGameRecords(gameDetail).map((k, i) => {
                            let getTotalNum = this.getTotalNum(k);
                            return (
                                <div id="accordion-reset" key={i} className={i == 0 ? 'win' : 'lose'}>
                                    <div className="win-header">
                                        <div className="win-type">
                                            {i == 0 ? '胜利方' : '失败方'}
                                        </div>
                                        <div className="total-data">杀人:{getTotalNum.totalKill}/死亡:{getTotalNum.death}/助攻:{getTotalNum.assists}/金钱:{getTotalNum.gold}</div>
                                    </div>
                                    <Accordion>    
                                            {k.map((_k, _i) => {
                                            let header = <div className="record-c-top">
                                                    <Link to={{pathname:`/heroContent/${_k.champion_id}`,query:{name:"", id: _k.champion_id}}}>
                                                        <div className="record-c-top-l">
                                                            <img src={`http://cdn.tgp.qq.com/pallas/images/champions_id/${_k.champion_id}.png`} />
                                                            {_k.qquin == qquin ? <img className="my-self" src={require('src/Style/img/desc_self.png')} /> : "" }
                                                            <p>Lv{_k.level}</p>
                                                        </div>
                                                    </Link>
                                                        <div className="record-c-top-m">
                                                            <h5 className={className({'my-self' : _k.qquin == qquin})}>{_k.name}</h5>
                                                            <div className="total-mid">{`${_k.champions_killed}/${_k.num_deaths}/${_k.assists}`}</div>
                                                            <div className="equipment-img">
                                                                {_k.item0 != 0 ? <img src={`http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/${_k.item0}.png`} /> : <span></span>}
                                                                {_k.item1 != 0 ? <img src={`http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/${_k.item1}.png`} /> : <span></span>}
                                                                {_k.item2 != 0 ? <img src={`http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/${_k.item2}.png`} /> : <span></span>}
                                                                {_k.item3 != 0 ? <img src={`http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/${_k.item3}.png`} /> : <span></span>}
                                                                {_k.item4 != 0 ? <img src={`http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/${_k.item4}.png`} /> : <span></span>}
                                                                {_k.item5 != 0 ? <img src={`http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/${_k.item5}.png`} /> : <span></span>}
                                                                {_k.item6 != 0 ? <img src={`http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/${_k.item6}.png`} /> : <span></span>}
                                                            </div>
                                                        </div>
                                                    </div>    
                                            return (
                                                <Accordion.Panel key={_i} header={header}>
                                                    <div className="record-c-bot"> 
                                                    <div className="colum">
                                                        <p>补兵<span>{_k.minions_killed}</span></p>    
                                                        <p>金钱<span>{_k.gold_earned}</span></p>    
                                                        <p>最大连杀<span>{_k.largest_killing_spree}</span></p>
                                                    </div>
                                                    <div className="colum">
                                                        <p>兵营<span>{_k.barracks_killed}</span></p>
                                                        <p>推塔<span>{_k.turrets_killed}</span></p>    
                                                        <p>最大多杀<span>{_k.largest_multi_kill}</span></p>
                                                    </div>
                                                    <div className="colum">
                                                        <p>总治疗<span>{_k.total_health}</span></p>    
                                                        <p>输出伤害<span>{_k.total_damage_dealt}</span></p>    
                                                        <p>承受伤害<span>{_k.total_damage_taken}</span></p>
                                                    </div>    
                                                    <p>给敌方影响造成的总伤害<span>{_k.total_damage_dealt_to_champions}</span></p>    
                                                    <p>给地方英雄造成的物理伤害<span>{_k.physical_damage_dealt_to_champions}</span></p>    
                                                    <p>给敌方英雄造成的魔法伤害<span>{_k.magic_damage_dealt_to_champions}</span></p>    
                                                    <p>对局评价分<span>{_k.game_score}.0</span></p>    
                                                </div>
                                                </Accordion.Panel>
                                            )
                                       })}
                                        </Accordion>
                                        
                                </div>
                            )
                        })    
                    }    
                   
                </section>
            </div>
        )
    }
    
    componentWillUnmount() {
    }
}

export default template({
    id: 'gameDetail',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

