import React, {Component} from 'react';

import SwipeableViews from 'react-swipeable-views';
import PanelA from './panelA';
import className from 'classnames';
import PanelB from './panelB';
import PanelC from './panelC';

import { is, fromJS} from 'immutable';

export default class PanelTab extends Component {
    constructor(props) {
        super(props);
         this.state = {
            index: 0,
        };

        this.handleChangeIndex = this.handleChangeIndex.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    handleChangeIndex (index) {
       this.setState({
           index: index
       })
    }

    render() {
        const {index} = this.state;
        return (
            <div className="panel-tab">
                <nav className="small-bar">
                    <ul>
                        <li className={className({active: index === 0})} onClick={() => {this.handleChangeIndex(0)}}>技能</li>
                        <li className={className({active: index === 1})} onClick={() => {this.handleChangeIndex(1)}}>皮肤</li>
                        <li className={className({active: index === 2})} onClick={() => {this.handleChangeIndex(2)}}>视频</li>
                    </ul>
                </nav>
                <SwipeableViews className="details" index={index} onChangeIndex={index => {this.handleChangeIndex(index)}}>
                    <PanelA getHeroContent={this.props.getHeroContent}/>
                    <PanelB getHeroContent={this.props.getHeroContent}/>
                    <div><PanelC {...this.props}/></div>
                </SwipeableViews>
            </div>
        )
    }
}