<template>
    <div class="article-wrap" v-if="article">
    <icon type="heart"></icon>
    <icona type="heart" :size="40" color="red"></icona>
        <div class="head-box">
            <h2 class="head-title">
            {{article.title}}
            </h2>
            <div class="head-intro">
                <div class="avatar">
                    <img alt="headImgUrl" src="https://avatars3.githubusercontent.com/u/1522494?v=4&amp;s=120" lazy="loaded">
                </div>
                <div class="head-middle">
                    <div class="head-middle-top">
                        <type-block :item="article"></type-block>
                        <span class="head-author-name">jingsam</span>
                    </div>
                    <div class="head-middle-bottom">
                        1年前创建 ·
                        <span>10504</span>次预览
                        <div class="icon-eye-open"></div>
                    </div>
                </div>
                <div class="head-right"></div>
            </div>
        </div>
    </div>
</template>
<script>
import fly from '@/utils/fly'
import typeBlock from '@/components/type-block'
import icona from '@/components/icon'
export default {
    name: "article",
    data() {
        return {
            article: null,
        }
    },
    components: {
        typeBlock,
        icona,
    },
    async onLoad() {
        const {
            id
        } = this.$root.$mp.query;
        wx.showLoading({
            title: '加载中',
        })
        let res = await fly.get(`topic/${id}`)
        if (res.success) {
            this.article = res.data;
            console.log(this.article)
        }

    }
}
</script>
<style lang="scss" scoped>
.article-wrap {
    .head-box {
        padding: 14px;
        .head-title {
            font-size: 18px;
            margin: 0;
        }
        .head-intro {
            display: flex;
            margin-top: 8px;
            align-items: center;
            .avatar {
                width: 36px;
                height: 36px;
                flex-shrink: 0;
                border-radius: 50%;
                overflow: hidden
            }
            .head-middle {
                flex: 1;
                margin-left: 10px;
                .head-middle-top {
                    display: flex;
                    align-items: center;
                    .head-author-name {
                        font-size: 14px;
                        margin-left: 8px;
                    }
                }
                .head-middle-bottom {
                    line-height: 20px;
                    font-size: 13px;
                    color: #666;
                    margin-top: 2px;
                }
            }
            .head-right {
                width: 36px;
                flex-shrink: 0;
                text-align: center;
                font-size: 16px;
            }
        }
    }
}
</style>
