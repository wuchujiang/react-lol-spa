import React, {Component} from 'react';
//import ReactEcharts from 'echarts-for-react';

export default class PanelB extends Component {
    constructor(props) {
        super(props);

    }

    option() {
        return {
            radar: {
                    indicator: [
                        {
                            text: '击杀',
                            max: 100
                        }, {
                            text: '生存',
                            max: 100
                        }, {
                            text: '助攻',
                            max: 100
                        }, {
                            text: '物理',
                            max: 100
                        },{
                            text: '魔法',
                            max: 100
                        },{
                            text: '防御',
                            max: 100
                        },{
                            text: '金钱',
                            max: 100
                        }
                    ],
                    radius: '70%',
                    center: ['50%', '50%'],
                    splitNumber: 4,
                    splitArea: {
                        areaStyle: {
                            color: ['rgba(114, 172, 209, 0.2)',
                            'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                            'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                            shadowBlur: 10
                        }
                    },
                    name: {
                        textStyle:{
                            color: '#111'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    },
                },
            series: {
                    type: 'radar',
                    itemStyle: {
                        normal: {
                            color: '#B8D3E4',
                            lineStyle: {
                                width: 4
                            },
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    data: [
                        {
                            value: [
                                60, 73, 85, 40,70,90,79
                            ],
                            name: '属性',
                            label: {
                                normal: {
                                    show: false,
                                    textStyle: {
                                        color: '#58a'
                                    }
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: 'rgba(255, 255, 255, 0.5)'
                                }
                            },
                            itemStyle:{
                                normal: {
                                    color: 'red',
                                    lineStyle: {
                                        width: 4
                                    }
                                }
                               
                            }
                        }
                    ]
                },
            textStyle:{
                fontSize: 28,
                fontFamily: '微软雅黑'
            }
        };
    }

    render() {
        return (<div>bbb</div>)
    }
}