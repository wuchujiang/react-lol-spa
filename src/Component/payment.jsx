import React, {Component, PropTypes} from 'react';
import {Header,template, Tartab} from './common/mixin';

export default class Payment extends Component {
    constructor() {
        super();
        this.state = {
            order: '87654321',
            type: '中医推拿',
            location: '沈阳分行健康小屋',
            address: '沈阳市沈河区市府大道2354号',
            total: '1400',
            phone: '13422343314'
        }
    }

    componentWillMount() {
       
    }
    componentDidMount() {
    }

   
    
    componentWillUpdate(nextProps,nextState){
       
    }

   
   
    render() {
        const state = this.state;
        console.log(state);
        return (
            <section className="wrap">
                <header className="header">
                    <div className="back-icon"></div>
                    <div className="title">订单</div>
                    <div className="eplise">
                        <div className="point"></div>
                        <div className="point"></div>
                        <div className="point"></div>
                    </div>
                </header>
                <section className="content">
                    <div className="order-number">
                        <div className="order-number-item">
                            订单号:{state.order}
                        </div>
                    </div>
                    <div className="order-info">
                        <div className="order-info-item">
                            <label>服务类型：</label>
                            <p>{state.type}</p>
                            <p className="phone">{state.phone}</p>
                        </div>
                        <div className="order-info-item">
                            <label>预约小屋：</label>
                            <p>{state.location}</p>
                        </div>
                        <div className="order-info-item">
                            <label>地址：</label>
                            <p>{state.address}</p>
                        </div>
                    </div>
                    <div className="total">
                        <h4>十次卡</h4>
                        <p className="price-total">
                            合计：¥{state.total}
                        </p>
                    </div>
                </section>
                <section className="wechat">
                    <div className="wechat-content">
                        <div className="icon"></div>
                        <div className="channel">微信支付</div>
                        <div className="check"></div>
                    </div>
                </section>
                <div className="footer">
                    <div className="footer-title">立即支付</div>
                </div>
            </section>
        )
    }
    
    componentWillUnmount() {
    }
}

export default template({
    id: 'Payment',  //应用关联使用的redux
    component: Payment,//接收数据的组件入口
    url: ''
});

