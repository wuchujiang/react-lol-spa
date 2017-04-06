import React ,{Component} from 'react';
import moment from 'moment';
import {Link} from 'react-router';
import { is, fromJS} from 'immutable';

export default class VideoItem extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
 
	}

	conversionTime(time) {
		return moment(time).format('YYYY-MM-DD');
	}

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

	render() {
		let {item ,author} = this.props;
		return (
			<Link to={{
					pathname: `/video/player`,
					query: {
						content: encodeURIComponent(item.content)
					}
				}}>
				<section className="video-list">
					<div className="video-img">
						<div className="video-img-item" style={{backgroundImage: `url(${item.img})`}}></div>
						<div className="play-times">1.2万</div>
					</div>
					<div className="video-item-content">
						<h5>{item.title}</h5>
						<div className="author-content">
							<div className="author-info">
								<div className="author-img">
									<img src={author[0] && author[0].img || ""} />
								</div>
								<p className="author-name">{item.author.name}</p>
							</div>
							<p className="day">{this.conversionTime(item.createdate)}</p>
						</div>
					</div>
				</section>
			</Link>
		)
	}
}