import React, {Component} from 'react';

import SwipeableViews from 'react-swipeable-views';
import className from 'classnames';
import {Carousel} from 'antd-mobile';
import { is, fromJS} from 'immutable';

export default class Skin extends Component {
    constructor(props) {
        super(props);
         this.state = {
            index: 0,
            data: ['', '', ''],
            initialHeight: 200,
        };

    }

    componendDidMount() {
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'AiyWuByWklrrUDlFignR'],
            });
        }, 100);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    render() {
        const {index} = this.state;
        const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
        let championDetail = this.props.getHeroContent && this.props.getHeroContent.data && this.props.getHeroContent.data.length > 0 ? this.props.getHeroContent.data[0] : [];

        return (
            <section className="skin-play">
                <Carousel
                    className="my-carousel" autoplay={false} infinite selectedIndex={1}
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                    >
                    {!_.isEmpty(championDetail) && championDetail.skins.map((ii, index) => (
                        <img key={index}
                            src={`http://cdn.tgp.qq.com/pallas/images/skins/original/${championDetail.key}-${ii.id}.jpg`}
                            
                        />
                    ))}
            </Carousel>
            </section>
        )
    }
}