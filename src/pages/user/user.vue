<template>
    <div class="user-wrap">
        <div class="user-head-wrap" :style="'height:'+height+'px'">
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
        <swiper :current="currentTab" class="swiper-box" duration="300" @change="swiperChange" :style="'height:'+contentHeight">
            <swiper-item v-for="(item,index) in navList" :key="index">
                <scroll-view scroll-y style="height:100%;" @scroll="scrollFn" @scrolltoupper="toUp" v-if="articleList.length">
                    <simple-article v-for="(item,i) in articleList" :article="item" :key="i"></simple-article>
                </scroll-view>
                <p v-else style="text-align:center">暂无数据</p>
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
import simpleArticle from '@/components/simple-article'

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
            articleList: [],
            height: 220,
            winHeight: null,
            navList: navList,
            article: null,
            user: null,
            author: null,
            currentTab: 0,
            userId: null,
        }
    },
    methods: {
        toUp() {
            this.height = 220
        },
        scrollFn(e) {
            // if (this.height = 0) return
            let top = e.mp.detail.scrollTop
            console.log(top)
            if (top > 60) {
                this.height = 0
            }
        },
        swiperChange(e) {
            let {
                current
            } = e.target;
            this.currentTab = current;
        },
        // 获取用户信息
        async getUserInfo(id) {
            let res
            try {
                res = await fly.get('user/' + id);
            } catch (err) {
                console.log(err)
            }
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
            this.articleList = this.user.recent_replies;
            this.author = pick(this.user, ['loginname', 'avatar_url'])
        },
        // 获取用户收藏的主题
        async getUserCollect() {
            wx.showLoading({
                title: '加载中'
            })
            try {
                let res = await fly.get('/topic_collect/' + this.userId)
                if (res.success && res.data && res.data.length) {
                    this.articleList = res.data.map(item => {
                        item.author = pick(this.user, ['loginname', 'avatar_url'])
                        return pick(item, ['title', 'id', 'last_reply_at', 'author'])
                    })
                }
            } catch (err) {

            }
            wx.hideLoading()
        }

    },
    watch: {
        currentTab(newVal, oldVal) {
            switch (newVal) {
                case 0:
                    this.articleList = this.user.recent_replies;
                    break;
                case 1:
                    this.articleList = this.user.recent_topics;
                    break;
                default:
                    this.getUserCollect()
            }
        },
    },
    computed: {
        contentHeight() {
            if (this.winHeight) {
                return this.winHeight - 44 - this.height + 'px'
            }
        }
    },
    components: {
        typeBlock,
        icon,
        wxParse,
        avatar,
        sliderNav,
        simpleArticle,
    },
    async onLoad() {
        // 获取系统消息
        let info = await wxp.getSystemInfo();
        this.winHeight = info.windowHeight
        this.userId = this.$root.$mp.query.id;
        wx.showLoading({
            title: '加载中',
        })
        this.height=220
        this.currentTab=0
        this.getUserInfo(this.userId)
        wx.hideLoading()
    }
}
</script>
<style lang="scss" scoped>
.user-wrap {
    height: 100%;
    .user-head-wrap {
        transition: height .6s;
        overflow: hidden;
        text-align: center;
        height: 220px;
        background-size: 100%;
        // background-image: url('https://static.yximgs.com/s1/i/pages/kuaiying/bg-c8b7e3f5e0.png');
        background-image: url('http://s3.music.126.net/m/s/img/hot_music_bg_2x.jpg');
        .avatar {
            margin: 20px auto 0;
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
        overflow: auto;
        .swiper-item {
            height: 100%;
            text-align: center;
            display: block;
        }
    }
}
</style>
