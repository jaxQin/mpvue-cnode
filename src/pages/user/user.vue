<template>
    <div class="user-wrap">
        <div class="user-head-wrap">
            <div class="avatar">
                <avatar v-if="author" :user="author" :size="90"></avatar>
            </div>
            <div class="name-wrap" v-if="user">
                <div class="name">
                    {{user.loginname}}
                </div>
                <div class="link">
                    {{user.githubUsername}}@github.com
                </div>
            </div>
            <div class="info" v-if="user">
                注册时间：{{user.create_at}}
                <span>积分：{{user.score}}</span>
            </div>
        </div>
        <slider-nav :navList="navList" :currentTab.sync="currentTab"></slider-nav>
        <swiper :current="currentTab" :style="'height:'+contentHeight" class="swiper-box" duration="300" @change="swiperChange">
            <swiper-item v-for="(item,index) in navList" :key="index">
                <scroll-view scroll-y style="height:100%;">
                    {{item.title}}
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </scroll-view>
            </swiper-item>
        </swiper>
    </div>
</template>
<script>
import fly from '@/utils/fly'
import typeBlock from '@/components/type-block'
import icon from '@/components/icon'
import sliderNav from '@/components/slider-nav'
import avatar from '@/components/avatar'
import wxParse from 'mpvue-wxparse';
import wxp from 'minapp-api-promise';

import {
    pick,
    debounce
} from 'lodash'
const navList = [{
    title: '最近回复',
    type: 'reply',
}, {
    title: '最新发布',
    type: 'topic',
}, {
    title: '话题收藏',
    type: 'collect',
}, ]
export default {
    name: "article",
    data() {
        return {
            winHeight: null,
            navList: navList,
            article: null,
            user: null,
            author: null,
            currentTab: 0,
        }
    },
    methods: {
        swiperChange(e) {
            let {
                current
            } = e.target;
            this.currentTab = current;
        },
        // 获取用户信息
        async getUserInfo(id = 'JacksonTian') {
            let res
            try {
                res = await fly.get('user/' + id);
            } catch (err) {
                console.log(err)
            }
            console.log(res)
            if (res.success) {
                //处理注册时间
                let {
                    create_at
                } = res.data;
                create_at = this.fromNow(create_at);
                this.user = Object.assign(res.data, {
                    create_at,
                });
            }
            this.author = pick(this.user, ['loginname', 'avatar_url'])
        },

    },
    computed: {
        contentHeight() {
            if (this.winHeight) {
                return this.winHeight - 44 - 200 + 'px'
            }
        }
    },
    components: {
        typeBlock,
        icon,
        wxParse,
        avatar,
        sliderNav,
    },
    async onLoad() {
        // 获取系统消息
        let info = await wxp.getSystemInfo();
        this.winHeight = info.windowHeight
            // const {
            //     id
            // } = this.$root.$mp.query;
            // wx.showLoading({
            //     title: '加载中',
            // })
        this.getUserInfo()
            // wx.hideLoading()
    }
}
</script>
<style lang="scss" scoped>
.user-wrap {
    .user-head-wrap {
        text-align: center;
        height: 200px;
        background-size: 100%;
        // background-image: url('https://static.yximgs.com/s1/i/pages/kuaiying/bg-c8b7e3f5e0.png');
        background-image: url('http://s3.music.126.net/m/s/img/hot_music_bg_2x.jpg');
        padding-top: 20px;
        .avatar {
            margin: 0 auto;
            width: 90px;
        }
        .name-wrap {
            text-align: center;
            color: #fff;
            .name {
                font-size: 18px;
                margin-top: 8px;
            }
            .link {
                margin-top: 8px;
                text-decoration: underline;
                color: #999;
            }
        }
        .info {
            padding: 0 16px;
            position: relative;
            color: #fff;
            margin-top: 10px;
            text-align: left;
            font-size: 14px;
            span {
                color: $light-color;
                right: 16px;
                position: absolute;
            }
        }
    }
    .swiper-box {
        display: block;
        width: 100%;
        overflow: hidden;
        .swiper-item {
            height: 100%;
            text-align: center;
        }
    }
}
</style>
