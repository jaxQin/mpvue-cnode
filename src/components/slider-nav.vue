<template>
    <scroll-view class="swiper-tab" scroll-x style="width: 100%">
        <view :style="menuStyle" v-for="(item,index) in navList" :key="index" class="swiper-tab-item" :data-current="index" @tap="swichNav">{{item.title}}</view>
        <view class="block" :style="style"></view>
    </scroll-view>
</template>
<script>
import wxp from 'minapp-api-promise';
import {
    obj2style
} from '@/common/js/basic'

export default {
    name: "slider-nav",
    data() {
        return {
            winWidth: null,
            winHeight: null,
            navWidth: null,
        }
    },
    props: {
        navList: {
            type: Array,
        },
        menuWidth: {
            type: Number,
        },
        currentTab: {
            type: Number,
            default: 0,
        },
        font: {
            type: Number,
            default: 14,
        }
    },
    methods: {
        swichNav(e) {
            const {
                current
            } = e.target.dataset;
            if (this.currentTab === current) return false
                // else this.currentTab = current;
            else {
                this.$emit('update:currentTab', current)
            }
        },
        swiperChange(e) {
            let {
                current
            } = e.target;
            this.currentTab = current;
        }
    },
    computed: {
        style() {
            // 计算左侧剩余多少宽度，所以滚动条起始位置要加
            let leftWidth = (this.winWidth - this.navList.length * this.navWidth) / 2;
            let width = this.navWidth + 'px';
            let left = leftWidth + this.navWidth * this.currentTab + 'px';
            let style = {
                left,
                width,
            }
            console.log(style)
            return obj2style(style)
        },
        menuStyle() {
            let style = {}
            style['font-size'] = this.font + 'px'
            style['width'] = this.navWidth + 'px'
            return obj2style(style)
        }
    },
    async onLoad() {
        // 获取系统消息
        let info = await wxp.getSystemInfo();
        this.winWidth = info.windowWidth;
        this.winHeight = info.windowHeight
        if (!this.menuWidth) {
            // 如果没有
            this.navWidth = this.winWidth / this.navList.length;
        } else {
            this.navWidth = this.menuWidth
        }
    },
}
</script>
<style lang="scss" scoped>
.swiper-tab {
    width: 100%;
    text-align: center;
    line-height: 42px;
    white-space: nowrap;
    position: relative;
    .swiper-tab-item {
        transition: all $time;
        font-size: 18px;
        height: 42px;
        display: inline-block;
        color: #777777;
    }
    .block {
        display: block;
        position: absolute;
        left: 0;
        height: 2px;
        background: $slider-color;
        bottom: 20px;
        transition: left $time;
        z-index: 99;
    }
}
</style>
