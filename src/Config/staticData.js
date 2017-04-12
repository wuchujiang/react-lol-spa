export const defaultSummoner = [{
    id: 'Garen',
    key: 86,
    title: '盖伦',
    name: '德玛西亚之力',
    tags: ['Fighter', 'Tank']
}, {
    id: 'Ashe',
    key: 22,
    title: '艾希',
    name: '寒冰射手',
    tags: ['Marksman', 'Support']
}, {
    id: 'Ryze',
    key: 13,
    title: '瑞兹',
    name: '符文法师',
    tags: ['Mage', 'Fighter']
}];

export const occupation = {
    Assassin: "刺客",
    Mage: '法师',
    Fighter: "战士",
    Marksman: '射手',
    Support: '辅助',
    Tank: '坦克'
}

export const skill = {
    'attack': '攻',
    'defense': '防',
    'difficulty': '操作',
    'magic': '法'
}

export const getRandInfo = (userHotInfo) => {
    let queue = "";
    let tier = "";
    switch (userHotInfo.tier) {
        case 255:
            queue = '暂无段位';
            break;
        case 5:
            queue = '英勇黄铜';
            break;
        case 4:
            queue = '不屈白银';
            break;
        case 3:
            queue = '荣耀黄金';
            break;
        case 2:
            queue = '华贵珀金';
            break;
        case 1:
            queue = '璀璨钻石';
            break;
        case 0:
            queue = '最强王者';
            break;
        case 6:
            queue = '超凡大师';
            break;
    };

    switch (userHotInfo.queue) {
        case 0:
            tier = 'Ⅰ';
            break;
        case 1:
            tier = 'Ⅱ';
            break;
        case 2:
            tier = 'Ⅲ';
            break;
        case 3:
            tier = 'Ⅳ';
            break;
        case 4:
            tier = 'Ⅴ';
            break;
        case 255:
            tier = '';
            break;
    }
    return queue + tier
}

export const game_type = (type) => {
    switch (type) {
        case 1:
            return '自定义';
        case 2:
            return '新手关';
        case 3:
            return '匹配赛';
        case 4:
            return '排位赛';
        case 5:
            return '战队赛';
        case 6:
            return '大乱斗';
        case 7:
            return '人机';
        case 8:
            return '统治战场';
        case 9:
            return '大对决';
        default:
            return '自定义';
    }
}


export const token = {
    user: '022C3-BBC12-63928-19298',
    video: 'DCD30-DDB9C-36D3D-363A0'
}