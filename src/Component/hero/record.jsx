import React, { Component } from 'react';
import className from 'classnames';
import { game_type } from 'src/Config/staticData';
import moment from 'moment';
import { Link } from 'react-router';
import PullView from '../common/pullView';
import { Icon } from 'antd-mobile';
let pageIndex = 1;
export default class Record extends Component {
    constructor(props) {
        super(props);
        let combatList = this.props.combatList;
        let combat = combatList.battle_list;
        this.state = {
            scrollState: 0,  // 1可以加载 2 加载中 3加载完成 4 没有内容了；
            initData: combat,
            loadingTip: "查看更多"
        };
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        /*
        **加载完成后改变scrollState的状态
        */
        if (this.state.scrollState == 3) {
            this.setState({
                scrollState: 1
            });
        }
    }

    scrollBottom() {
        //滑动到底部时加载；
        if (this.state.scrollState == 0 || this.state.scrollState == 1) {
            this.setState({
                scrollState: 2,
                loadingTip: '正在加载中'
            });
            let qquin = this.props.actions.searchClick.qquin,
                vaid = this.props.actions.searchClick.area_id,
                p = pageIndex++;
            this.props.getData(`/CombatList?qquin=${qquin}&vaid=${vaid}&p=${p}`, null, (data) => {
                if (data.code == 0 && data.data[0].result == 0 && data.data[0].battle_list.length > 0) {
                    let battle_list = data.data[0].battle_list;
                    let initData = this.state.initData;
                    this.setState({
                        initData: initData.concat(battle_list),
                        scrollState: 3,
                        loadingTip: '查看更多'
                    })
                }else{
                    this.setState({
                        scrollState: 4,
                        loadingTip: '已经到最底了!'
                    })
                }
            });
        }
    }

    clickHandle(item) {
        this.props.gameFlag({
            qquin: this.props.actions.searchClick.qquin,
            vaid: this.props.actions.searchClick.area_id,
            game_id: item.game_id
        });
    }


    render() {
        //let userInfo = getUserHotInfo.data && getUserHotInfo.data.length > 0 ? getUserHotInfo.data[0] : {};

        return(
            <div className="record-item">
                <PullView onScrollToBottom={() => {this.scrollBottom()}}>
                    {this.state.initData.map((k, i) => {
                        return (
                            <div  key={i} onClick={(e) => {this.clickHandle(k)}}>
                            <Link to="hero/gameDetail" >
                                <div className={className({win: k.win == 1, item: true})}>
                                    <div className="item-one">
                                            <img src={`http://cdn.tgp.qq.com/pallas/images/champions_id/${k.champion_id}.png`} />
                                    </div>
                                    <div className="item-two">
                                        <p className="type">
                                            {game_type(k.game_type)}
                                        </p>
                                    </div>
                                    <div className='item-three'>
                                            <p>{k.win == 1 ? '胜利' : '失败'}</p>
                                    </div>
                                    <div className="item-four">
                                            <p>{moment(k.battle_time).format('MM-DD HH:mm')}</p>
                                    </div>
                                    <Icon type="right" />
                                </div>
                        </Link>  
                        </div>   
                    ) 
                })}
                </PullView>
                <div className="scroll-loading">
                    <p>
                        {this.state.scrollState == 2 ? <Icon type="loading" /> : ""}    
                        {this.state.loadingTip}
                    </p>
                </div>
            </div>    
        )
    }
}