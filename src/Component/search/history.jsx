import React, {Component} from 'react';

import className from 'classnames';

import { is, fromJS} from 'immutable';

export default class PanelTab extends Component {
    constructor(props) {
        super(props);
         this.state = {
            index: 0,
        };

    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

   

    render() {
        return (
            <div className="search-history">
                
            </div>
        )
    }
}