import React, { Component } from 'react';
import { Icon, Toast } from 'antd-mobile';
import { Link } from 'react-router';
export default class Anchor extends Component{
    constructor(props) {
        super(props);
        this.state = {
            anchor: []
        }
    }

    componentDidMount() {
        this.props.getVideoData(`/GetAuthors`, null, (data) => {
            if (data.code == 0) {
                this.setState({
                   anchor: data.data
               })
            } else {
                Toast.fail('系统错误！');
           }
        });
    }

    render() {
        let anchor = this.state.anchor;
        return (
            <section className="anchor">
                <header>
                    <h4>主播</h4>
                    <Link to="video/anchors"><span>全部主播<Icon type='right'/></span></Link>
                </header>
                <div className="anchor-wrap">
                    <ul className="anchor-list">
                    {anchor.map((k, i) => {
                        return (
                            <li className="anchor-item" key={i}>
                                <Link>
                                    <div className="anchor-img">
                                        <img src={k.img} alt=""/>
                                    </div>
                                    <p>{k.name}</p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                </div>    
            </section>
        )
    }
}