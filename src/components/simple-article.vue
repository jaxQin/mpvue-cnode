<template>
    <!-- 文章简单信息展示，用于user页面 -->
    <div class="feed-content" @tap="goArticle">
        <avatar v-if="article" :user="article.author"></avatar>
        <div class="feed-right">
            <div class="feed-right-top">
                <div class="feed-title">
                    <p>{{article.title}}</p>
                </div>
            </div>
            <div class="feed-right-bottom" v-if="article">
                <div class="feed-time"><span>{{article.author.loginname}}</span></div>
                <div class="feed-pass">
                    1个月前
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import avatar from '@/components/avatar'
export default {
    name: "",
    props: ['article'],
    components: {
        avatar,
    },
    methods: {
        goArticle() {
            wx.navigateTo({
                url: '/pages/article/main?id=' + this.article.id
            })
        },
    },
}
</script>
<style lang="scss" scoped>
.feed-content {
    margin-top: 0;
    display: flex;
    font-size: 14px;
    padding: 14px;
    align-items: center;
    border-bottom: 1px solid $grey-border;
    .feed-right {
        flex: 1;
        min-width: 0;
        margin-left: 8px;
        .feed-right-top {
            display: flex;
            justify-content: space-between;
            .feed-title {
                display: flex;
                align-items: center;
                min-width: 0;
                p {
                    margin: 0 0 0 8px;
                    font-size: 14px;
                    line-height: 24px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    flex: 1;
                    min-width: 0;
                }
            }
        }
        .feed-right-bottom {
            display: flex;
            justify-content: space-between;
            .feed-time {
                font-size: 12px;
                color: #666;
                margin-left: 8px;
            }
            .feed-pass {
                font-size: 13px;
            }
        }
    }
}
</style>
