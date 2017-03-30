import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Header,template} from './common/mixin';
import Circle from './heroContent/circle';
import {occupation, skill} from 'src/Config/staticData';
import SwipeableViews from 'react-swipeable-views';
import PanelTab from './heroContent/panelTab';
import { Icon, Toast } from 'antd-mobile';
import _ from 'lodash';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getHeroContent: {},
            index: 0
        }
        this.handleChangeIndex = this.handleChangeIndex.bind(this);
    }


    componentWillMount() {
       
    }
    componentDidMount() {
        Toast.loading('加载中', 0);
        this.props.getData(`http://lolapi.games-cube.com/GetChampionDetail?champion_id=${this.props.actions.summonerClick.keys}`, null, (data) => {
            Toast.hide();
            this.setState({
                getHeroContent: data
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

    mapDetailInfo(championDetail) {
        let mapDetailInfo = championDetail.info ? championDetail.info : {};
        let mapDetailInfoKey = _.keys(mapDetailInfo);
        let mapDetailInfoArr = [];
        let dpr = Math.min(window.devicePixelRatio, 3);
        const skillColor = {
            'attack': '#f67e33',
            'defense': '#3cada4',
            'difficulty': '#74a7d9',
            'magic': '#cc4245'
        };
        mapDetailInfoKey.map(k => {
            mapDetailInfoArr.push(
                <li key={_.uniqueId()}>
                    <span>{skill[k]}</span>
                    <Circle perent={mapDetailInfo[k]*10} smallColor={skillColor[k]} width={dpr*20} lineWidth={dpr*2} />
                </li>
            )
        })
        return mapDetailInfoArr;
    }

    handleChangeIndex (index) {
       this.setState({
           index: index
       })
    }
   
    render() {
        let championDetail = this.state.getHeroContent && this.state.getHeroContent.data && this.state.getHeroContent.data.length > 0 ? this.state.getHeroContent.data[0] : [];
        let index = this.state.index;
        return (
            <section>
                <Header title={this.props.actions.summonerClick.name}/>
                <div className='champion-detail' style={{backgroundImage: `url(http://cdn.tgp.qq.com/pallas/images/skins/original/${this.props.actions.summonerClick.keys}-000.jpg)`}}>
                    <div className="nav-spaces"></div>       
                    <h4>{championDetail.title}</h4>
                    <p className="championDetailTags">{
                        championDetail.tags && championDetail.tags.map(k => {
                            return (
                                <span key={_.uniqueId()}>{occupation[k]}</span>
                            )}
                        )
                    }
                    </p>
                    <ul>
                        {this.mapDetailInfo(championDetail)}
                    </ul>
               </div>
                <PanelTab getHeroContent={this.state.getHeroContent} {...this.props} />
            </section>
        )
    }
    
    componentWillUnmount() {
    }
}

export default template({
    id: 'heroContent',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});

