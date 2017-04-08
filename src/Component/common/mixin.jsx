import React, {Component, PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import pureRender from 'pure-render-decorator';
import { is, fromJS} from 'immutable';
import { Tool } from '../../Config/Tool';
import template from './template';
import { TabBar, Icon, NavBar } from 'antd-mobile';
export {template}

/**
 * 公共头部
 *
 * @export
 * @class Header
 * @extends {Component}
 */


export class Header extends Component {  //头部标题
     constructor(props,context) {
        super(props,context);
        this.state = {
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    leftClick() {
        if(this.props.pathName == 'search'){
            this.context.router.push('/home');
        }else{
            window.history.back();
        }
    }
    
    render() {
        let {title, leftContent} = this.props;
        
        //let {saleRecord ,title ,HideList,goback ,save,productsInform,applyRecord,params} = this.props;
        
        /*if (goback&&params) {
            goback = ( <Link to={'/index'+params} className='head_goback left'>返回</Link>)
        }else if (goback){
            goback = (<span className='head_goback left' onClick={() => window.history.back()}>返回</span>)
        }*/
        
        return (
            <div className="nav-space">
                <NavBar style={this.props.style} leftContent={leftContent} mode="dark" onLeftClick={e=>{this.leftClick();}}
                rightContent={this.props.rightContent}
                >{title}</NavBar>
            </div>
        );
    }
}


export class Tartab extends Component{
    constructor(props, context) {
        super(props);
        this.jumpPage = this.jumpPage.bind(this);
    }

    jumpPage(k) {
        if(k == 1){
            this.context.router.push('/app')
        }else if(k==2){
            this.context.router.push('/video')
        }else if(k == 3){
            this.context.router.push('/summoner')
        }else if( k == 4){
            this.context.router.push('/home')
        }
    }

    render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                >
                <TabBar.Item
                    title="搜索"
                    key="搜索"
                    onPress={e=>{this.jumpPage(1);}}
                    selected={this.props.selected == 0}
                    icon={< div style = {{ width: '0.44rem', height: '0.44rem', background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center / 0.42rem 0.42rem no-repeat' }}/>}
                    selectedIcon={< div style = {{ width: '0.44rem', height: '0.44rem', background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center / 0.42rem 0.42rem no-repeat' }}/>}
                    data-seed="logId">
                </TabBar.Item>
                <TabBar.Item
                    icon={< Icon type = "koubei-o" size = "md" />}
                    selectedIcon={< Icon type = "koubei" size = "md" />}
                     onPress={e=>{this.jumpPage(2);}}
                    title="视频"
                    key="视频"
                    selected={this.props.selected == 1}
                    data-seed="logId1">
                </TabBar.Item>
                <TabBar.Item
                    selected={this.props.selected == 2}
                     onPress={e=>{this.jumpPage(3);}}
                    icon={< div style = {{ width: '0.44rem', height: '0.44rem', background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center / 0.42rem 0.42rem no-repeat' }}/>}
                    selectedIcon={< div style = {{ width: '0.44rem', height: '0.44rem', background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center / 0.42rem 0.42rem no-repeat' }}/>}
                    title="英雄"
                    key="英雄"
                   >
                </TabBar.Item>
                <TabBar.Item
                    selected={this.props.selected == 3}
                    onPress={e=>{this.jumpPage(4);}}
                    icon={{
                    uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg'
                }}
                    selectedIcon={{
                    uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'
                }}
                    title="我的"
                    key="我的"
                   >
                </TabBar.Item>
            </TabBar>
        )
    }
}

Tartab.contextTypes = {
    router: PropTypes.object
}

Header.contextTypes = {
    router: PropTypes.object
}




