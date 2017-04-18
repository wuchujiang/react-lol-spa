import React ,{Component} from 'react';
import VideoItem from './VideoItem';
import moment from 'moment';
import {Toast, Result} from 'antd-mobile';
import { is, fromJS} from 'immutable';

export default class PanelC extends Component {
	constructor(props) {
		super(props);
		this.state = {
			getHeroVideo: {},
			getAuthor: {}
		}
	}

	componentDidMount() { 
		Toast.loading('加载中', 0);
        this.props.getVideoData(`/GetHeroVideos?hero=${this.props.actions.summonerClick.keys || this.props.location.query.id}&p=${1}`, null, (data) => {
            Toast.hide();
            this.setState({
                getHeroVideo: data
            })
        });

		this.props.getVideoData(`/GetAuthors`, null, (data) => {
            Toast.hide();
            this.setState({
                getAuthor: data
            })
        });
	}

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

	getAuthorImg(id) {
		let getAuthor = this.state.getAuthor && this.state.getAuthor.data ? this.state.getAuthor.data : [];
		return _.filter(getAuthor, {id: id}) || {}
	}

	render() {
		let getHeroVideo = this.state.getHeroVideo && this.state.getHeroVideo.data ? this.state.getHeroVideo.data : [];
		return (
			<section className="videoList">
				{!_.isEmpty(this.state.getHeroVideo) ? !_.isEmpty(getHeroVideo) ? getHeroVideo.map((k, i) => {
					return (
							<VideoItem key={i} item={k} author={this.getAuthorImg(k.author.id)} />
						)
				}):<Result
                            img={<img src={require('src/Style/svg/notice.svg')} />}
                            title="查找失败"
                            message="没有找到相关英雄，请重新再试！"/>: ""}
			</section>
		)
	}
}