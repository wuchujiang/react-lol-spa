import React, {Component} from 'react';
import { Link } from 'react-router';
import className from 'classnames';
import { Icon, List, Modal } from 'antd-mobile';
import { is, fromJS} from 'immutable';
import {Tool} from 'src/Config/Tool';
const Item = List.Item;
const Brief = Item.Brief;
export default class PanelTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            history: []
        };

    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    componentDidMount() {
        let history = Tool.getLocationObj('history');
        this.setState({
            history
        })
    }

    deleteHandle() {
        let _this = this;
        Modal.alert('删除', '确定要删除么???', [
            { text: '取消'},
            {
                text: '确定', onPress: () => { 
                    _this.setState({
                        history: []
                    });
                    localStorage.removeItem('history');
                    _this.props.deleteHistory();
            }, style: { fontWeight: 'bold' } },
        ])
   } 

    render() {
        let history = this.state.history;
        let filterHistory = _.compact(history);//过滤空对象。
        return (
            !_.isEmpty(filterHistory) ? <section className="search-history">
                
                <List renderHeader={<header><p>最近搜索</p><p onClick={e => { this.deleteHandle();}} className="delete">清空记录</p></header>} className="my-list">
                    {
                        filterHistory.map((k, i) => {
                            return (
                                <Item
                                    key={i}
                                    arrow="horizontal"
                                    multipleLine
                                    onClick={() => {}}
                                    platform="android"
                                    >
                                    <Link to={{
                                        pathname: `search/searchResult`, query: {
                                            keyword: k.value,
                                            id: k.id
                                        }
                                    }}>{k.value} <Brief>{k.name}</Brief></Link>
                                </Item>
                            )
                        })
                    }
                </List>
            </section> : <div></div>
        )
    }
}

// $.ajax({
//     url: 'http://lolapi.games-cube.com/Free',
//     beforeSend: function (request) {
//         request.setRequestHeader("DAIWAN-API-TOKEN", "BDD5D-94434-4D8A4-BB4D8");
//     },
//     success: function (data) {
//         console.log(data);
//     }
// })