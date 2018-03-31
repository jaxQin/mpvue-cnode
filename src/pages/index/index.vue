<template>
    <div class="container">
        <slider-nav :menuWidth="60" :currentTab.sync="currentTab" :navList="this.navList"></slider-nav>
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
import sliderNav from '@/components/slider-nav'
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
        swiperChange(e) {
            let {
                current
            } = e.target;
            this.currentTab = current;
        }
    },
    computed: {

        contentHeight() {
            return this.winHeight - 62 + 'px'
        }
    },
    components: {
        contentV: content,
        sliderNav,
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
