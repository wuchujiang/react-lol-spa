var webpack = require('webpack');
var express = require('express');
var path = require('path');
var proxyMiddleware = require('http-proxy-middleware')

var app = express();


//代理服务器
app.use(/\/(Free|Area|UserArea|UserHotInfo|ChampionRank|GetChampionDetail|UserExtInfo|BattleSummaryInfo|CombatList|GameDetail|champion)/, proxyMiddleware({
    target: 'http://lolapi.games-cube.com',
    changeOrigin: true
}));

app.use(/\/(GetAuthors|GetAuthorVideos|GetNewstVideos|GetHeroVideos|FindVideos)/, proxyMiddleware({
    target: 'http://infoapi.games-cube.com',
    changeOrigin: true
}));


app.use(express.static(path.join(__dirname, '/')));

//转发接口
app.get('/getNews', function(req, res) {
    var superagent = require('superagent');
    var sreq = superagent.get(`http://qt.qq.com/php_cgi/news/php/varcache_getnews.php?id=12&page=${req.query.page}&plat=android&version=9724`);
    sreq.pipe(res);
    sreq.on('end', function() {
        //console.log(res);
    });
});

//将其他路由，全部返回index.html
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.listen(8088, function() {
    console.log('正常打开8088端口')
});