export default {
    formatDate: function (date) {
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    },
    formatDateTime: function (date) {
        const Y = date.getFullYear();
        let M = date.getMonth() + 1;
        M = M < 10 ? '0' + M : M;
        let D = date.getDate();
        D = D < 10 ? ('0' + D) : D;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return Y + '-' + M + '-' + D + " " + h + ":" + m + ":" + s;
    },
    formatDateMinuteTime: function (date) {
        const Y = date.getFullYear();
        let M = date.getMonth() + 1;
        M = M < 10 ? '0' + M : M;
        let D = date.getDate();
        D = D < 10 ? ('0' + D) : D;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return Y + '-' + M + '-' + D + " " + h + ":" + m;
    },
    formatDateChinese: function (date) {
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '年' + m + '月' + d + "日";
    },
    lngLatChange: function(lngLat){
         //定义一些常量
        var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
        var PI = 3.1415926535897932384626;
        var a = 6378245.0;
        var ee = 0.00669342162296594323;
        var transformlat = function transformlat(lng, lat) {
            var lat = +lat;
            var lng = +lng;
            var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
            ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
            ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
            return ret
        };
        var transformlng = function transformlng(lng, lat) {
            var lat = +lat;
            var lng = +lng;
            var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
            ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
            ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
            return ret
        }
        /**
         * 判断是否在国内，不在国内则不做偏移
         * @param lng
         * @param lat
         * @returns {boolean}
         */
        var out_of_china = function out_of_china(lng, lat) {
            var lat = +lat;
            var lng = +lng;
            // 纬度3.86~53.55,经度73.66~135.05 
            return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
        };

        /**
         * WGS84转GCj02
         * @param lng
         * @param lat
         * @returns {*[]}
         */
        function wgs84togcj02(lng, lat) {
            var lat = +lat;
            var lng = +lng;
            if (out_of_china(lng, lat)) {
                return [lng, lat]
            } else {
                var dlat = transformlat(lng - 105.0, lat - 35.0);
                var dlng = transformlng(lng - 105.0, lat - 35.0);
                var radlat = lat / 180.0 * PI;
                var magic = Math.sin(radlat);
                magic = 1 - ee * magic * magic;
                var sqrtmagic = Math.sqrt(magic);
                dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
                dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
                var mglat = lat + dlat;
                var mglng = lng + dlng;
                return [mglng, mglat]
            }
        };
        return wgs84togcj02(lngLat[0], lngLat[1]);
    }
}

// /**
//  * 日期格式化 xxxx-xx-xx
//  * date     Date类型
//  */
// exports.formatDate = function (date) {
//     const y = date.getFullYear();
//     let m = date.getMonth() + 1;
//     m = m < 10 ? '0' + m : m;
//     let d = date.getDate();
//     d = d < 10 ? ('0' + d) : d;
//     return y + '-' + m + '-' + d;
// }
// /**
//  * 时分秒日期格式化 xxxx-xx-xx xx:xx:xx
//  * date     Date类型
//  */
// exports.formatDateTime = function (date) {
//     const Y = date.getFullYear();
//     let M = date.getMonth() + 1;
//     M = M < 10 ? '0' + M : M;
//     let D = date.getDate();
//     D = D < 10 ? ('0' + D) : D;
//     let h = date.getHours();
//     h = h < 10 ? ('0' + h) : h;
//     let m = date.getMinutes();
//     m = m < 10 ? ('0' + m) : m;
//     let s = date.getSeconds();
//     s = s < 10 ? ('0' + s) : s;
//     return Y + '-' + M + '-' + D + " " + h + ":" + m + ":" + s;
// }
// /**
//  * 日期格式化 xxxx年xx月xx日
//  * date     Date类型
//  */
// exports.formatDateChinese = function (date) {
//     const y = date.getFullYear();
//     let m = date.getMonth() + 1;
//     m = m < 10 ? '0' + m : m;
//     let d = date.getDate();
//     d = d < 10 ? ('0' + d) : d;
//     return y + '年' + m + '月' + d + "日";
// }