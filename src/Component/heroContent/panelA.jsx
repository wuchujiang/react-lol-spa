import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import {Accordion} from 'antd-mobile';
import className from 'classnames';
import { is, fromJS} from 'immutable';

export default class PanelA extends Component{
    constructor(props) {
        super(props);
        this.changeSkillMain = this.changeSkillMain.bind(this);
        this.state = {
            skillActive:1
        };
        this.imgError = this.imgError.bind(this);
    }

    setSkillMain(championDetail) {
        let skillActive = this.state.skillActive;
        return (
           <div>
                <h5>{skillActive == 1 ? championDetail.passive.name : championDetail.spells[skillActive-2].name}</h5>
                <p className="tooltip" dangerouslySetInnerHTML={{__html: skillActive == 1 ? championDetail.passive.description : championDetail.spells[skillActive-2].tooltip}} />
           </div>
        )
    }

    changeSkillMain(num) {
        this.setState({
            skillActive: num
        })
    }

    getTrait(championDetail) {
        let traits = championDetail.trait;
        let traitsArr = [];
        for(let k in traits){
            traitsArr.push([
                k,traits[k]["add-point"], traits[k]["eq-recommond"]
            ])
        }
        return traitsArr;
    }

    transformName(k) {
        switch(k) {
            case 'sd' :
                return '上单';
            case 'dy' :
                return '打野';
            case 'zd' :
                return '中单';
            case 'fz' :
                return '辅助';
            case 'adc' :
                return 'ADC';
            default :
                return "加点";
        }
    }

    recommond(item) {
        let temp = [];
        for(let i=0;i < item.length;i++){
            let tempArr = item[i].split(";");
            for(let j = 0;j < tempArr.length; j++){
                if(tempArr[j].indexOf(":")> 0){
                    let tempArr2 = tempArr[j].split(":");
                    tempArr.splice(j,1);
                    for(let l=0;l<tempArr2[1];l++){
                        tempArr.splice(j,0, tempArr2[0]);
                    }
                }

            }
            temp.push(tempArr);
        }
        return temp;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    imgError(e) {
        e.target.src = require('src/Style/img/photo_default.jpg');
    }

    render() {
        let championDetail = this.props.getHeroContent && this.props.getHeroContent.data && this.props.getHeroContent.data.length > 0 ? this.props.getHeroContent.data[0] : [];
        const recomondName = ['出门装','前期', '核心', '终极神装'];

        return (
            <div className="skill-introduce">
                <div className="technique">
                    <h4>技能介绍</h4>
                    <div className="skill-content">
                        <ul className="skill-image">
                            {championDetail.passive && championDetail.passive.image && <li className={className({
                                active: this.state.skillActive === 1
                            })} onClick={e => { this.changeSkillMain(1) } }>
                                <img onError={e => { this.imgError(e) } } src={`http://ossweb-img.qq.com/images/lol/img/passive/${championDetail.passive.image.full}`} alt=""/>
                            </li>}
                                {
                                    championDetail.spells && championDetail.spells.map((k, index) => {
                                        return (
                                            <li key={_.uniqueId()} className={className({ active: this.state.skillActive === (index + 2) })} onClick={e => { this.changeSkillMain(index + 2) } } >
                                                <img onError={e => { this.imgError(e) } } src={`http://ossweb-img.qq.com/images/lol/img/spell/${k.image.full}`} alt=""/>
                                            </li>
                                        )
                                        
                                    })
                                }
                        </ul>
                        <div className="skill-content-main">
                            {championDetail && championDetail.passive && this.setSkillMain(championDetail)}
                        </div>
                    </div>
                    
                </div>
                <div className="technique">
                    <h4>加点出装</h4>
                    <div className="technique-item">
                        {championDetail.trait && this.getTrait(championDetail).map(k => {
                            return (
                                <div className="technique-items" key={_.uniqueId()}>
                                    <h5>{this.transformName(k[0])}：</h5>
                                    <span>加点顺序:{k[1]}</span>
                                    <div className="recommond">
                                        {this.recommond(k[2]).map((k, i) => {
                                            return(
                                                <div  className="equipment-item" key={_.uniqueId()}>
                                                    <p>{recomondName[i]}</p>
                                                    <div>
                                                        { k.map((_k, _i) => {
                                                          return (
                                                              <img onError={e => { this.imgError(e) } } key={_.uniqueId()} src={`http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/${_k}.png`} />
                                                            )                                                         
                                                       })}
                                                   </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}