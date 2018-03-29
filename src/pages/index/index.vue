<template>
    <div class="container">
        <scroll-view class="swiper-tab" scroll-x style="width: 100%">
            <view v-for="(item,index) in navList" :key="index" class="swiper-tab-item" :data-current="index" @tap="swichNav">{{item.title}}</view>
            <view class="block" :style="'left:'+left"></view>
        </scroll-view>
        <swiper :current="currentTab" :style="'height:'+contentHeight" class="swiper-box" duration="300" @change="swiperChange">
            <swiper-item v-for="(item,index) in navList" :key="index">
                <content-v v-if="index==currentTab" :currentTab="item"></content-v>
            </swiper-item>
        </swiper>
    </div>
</template>
<script>
import fly from "@/utils/fly";
import wxp from 'minapp-api-promise';
import content from '@/components/content'
import {
    navList
} from '@/common/js/basic'
export default {
    name: 'index',
    data() {
        return {
            navList: navList,
            winWidth: 0,
            winHeight: 0,
            // tab切换
            currentTab: 0,
        };
    },
    methods: {
        swichNav(e) {
            const {
                current
            } = e.target.dataset;
            if (this.currentTab === current) return false
            else this.currentTab = current;
        },
        swiperChange(e) {
            let {
                current
            } = e.target;
            this.currentTab = current;
        }
    },
    computed: {
        left() {
            // 计算左侧剩余多少宽度，所以滚动条起始位置要加
            let leftWidth = (this.winWidth - navList.length * 60) / 2
            return leftWidth + 60 * this.currentTab + 'px'
        },
        contentHeight() {
            return this.winHeight - 62 + 'px'
        }
    },
    components: {
        contentV: content,
    },
    async onLoad() {
        // 获取系统消息
        let info = await wxp.getSystemInfo();
        this.winWidth = info.windowWidth;
        this.winHeight = info.windowHeight
    },

};
</script>
<style lang="scss" scoped>
.container {
    height: 100%;
    .swiper-tab {
        width: 100%;
        text-align: center;
        line-height: 60px;
        white-space: nowrap;
        position: relative;
        .swiper-tab-item {
            transition: all .1s;
            font-size: 18px;
            height: 60px;
            display: inline-block;
            width: 60px;
            color: #777777;
        }
        .block {
            width: 60px;
            display: block;
            position: absolute;
            left: 0;
            height: 2px;
            background: red;
            bottom: 30px;
            transition: left .2s;
            z-index: 99;
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
