import React, {Component} from 'react';
import {Accordion} from 'antd-mobile';
import className from 'classnames';
import { is, fromJS} from 'immutable';
import _ from 'lodash';
import Skin from './skin';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
export default class PanelA extends Component{
    constructor(props) {
        super(props);
        this.state = {
            skinPlay: false
        }
       
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    render() {
        let championDetail = this.props.getHeroContent && this.props.getHeroContent.data && this.props.getHeroContent.data.length > 0 ? this.props.getHeroContent.data[0] : [];

        return (
            <div><ul className="skins">
              {
                  !_.isEmpty(championDetail) && championDetail.skins.map((k, i) => {
                  return (
                    <li>
                        <LazyLoad once={false}  throttle={50} height={300} placeholder={<div>加载中......</div>}>
                            <ReactCSSTransitionGroup key='1'
                            transitionName="fade"
                            transitionAppear={true}
                            transitionAppearTimeout={500}
                            transitionEnter={false}
                            transitionLeave={false}>
                            <img  src={`http://cdn.tgp.qq.com/pallas/images/skins/original/${championDetail.key}-${k.id}.jpg`} alt=""/>
                            </ReactCSSTransitionGroup>
                        </LazyLoad >
                        <p>{k.name}</p>
                    </li>
                  )
              })
            }
            </ul>
            {this.state.skinPlay && <Skin getHeroContent={this.props.getHeroContent} />}
            </div>
        )
    }
}