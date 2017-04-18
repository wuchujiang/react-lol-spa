import request from 'superagent';
import jsonp from 'superagent-jsonp';
import { Toast } from 'antd-mobile';
import { token } from 'utils/staticData';

let publicTool = {
    getBuDuMapLocation(location1, location2) {
        function fD(a, b, c) {
            for (; a > c;)
                a -= c - b;
            for (; a < b;)
                a += c - b;
            return a;
        };

        function jD(a, b, c) {
            b != null && (a = Math.max(a, b));
            c != null && (a = Math.min(a, c));
            return a;
        };

        function yk(a) {
            return Math.PI * a / 180
        };

        function Ce(a, b, c, d) {
            var dO = 6370996.81;
            console.log(dO * Math.acos(Math.sin(c) * Math.sin(d) + Math.cos(c) * Math.cos(d) * Math.cos(b - a)));
            return dO * Math.acos(Math.sin(c) * Math.sin(d) + Math.cos(c) * Math.cos(d) * Math.cos(b - a));
        };

        function getDistance(a, b) {
            if (!a || !b)
                return 0;
            a.lng = fD(a.lng, -180, 180);
            a.lat = jD(a.lat, -74, 74);
            b.lng = fD(b.lng, -180, 180);
            b.lat = jD(b.lat, -74, 74);
            return Ce(yk(a.lng), yk(b.lng), yk(a.lat), yk(b.lat));
        };

        //计算2个坐标的距离
        return getDistance(location1, location2);
    },

    getServiceData(url, query = {}, success = () => {}, failed = () => {}) {
        request.get(url)
            .timeout(15000)
            .set('DAIWAN-API-TOKEN', token.user)
            .query(query)
            .then(
                res => {
                    let data = JSON.parse(res.text);
                    success && success(data);
                },
                err => {
                    Toast.offline('网络连接失败!');
                    failed && failed();
                }
            )
    },

    getServiceDataByJsonp(url, query = {}, success = () => {}, failed = () => {}) {
        request.get(url)
            .timeout(15000)
            .query(query)
            .use(jsonp)
            .then(
                res => {
                    Toast.hide()
                    let data = JSON.parse(res.text);
                    success && success(data);
                },
                err => {
                    Toast.hide()
                    Toast.offline('网络连接失败!');
                    failed && failed();
                }
            )
    }
}

module.exports = publicTool;