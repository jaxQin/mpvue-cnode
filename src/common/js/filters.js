/*
 * @Author: jaxQin
 * @Date:   2018-03-29 11:03:43
 * @Last Modified by:   jaxQin
 * @Last Modified time: 2018-03-29 15:20:55
 */

'use strict';
import { navList } from '@/common/js/basic';
import Vue from 'vue'
import _ from 'lodash';
const listMap = _.keyBy(navList, 'type')

// 格式化时间
Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
const getTimeInfo = (str) => {
    if (!str) {
        return ''
    }
    const date = new Date(str);
    const time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return '';
    } else if (time / 1000 < 60) {
        return '刚刚';
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前';
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前';
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前';
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '月前';
    } else {
        return parseInt(time / 31536000000) + '年前';
    }
}
const filters = {
    install(Vue, val) {
        Vue.prototype.getTopicType = function(val='share') { //全局函数1
            return listMap[val].title
        };
    }
}
const formatTime = {
    install(Vue, val) {
        Vue.prototype.formatTime = function(val) { //全局函数1
            val = new Date(val)
            return val.format('yyyy-MM-dd hh:mm:ss')
        };
    }
}
const fromNow = {
    install(Vue, val) {
        Vue.prototype.fromNow = function(val) { //全局函数1
            return getTimeInfo(val)
        };
    }
}

export { filters, formatTime, fromNow }
