<template>
    <div class="content">
        <scroll-view scroll-y style="height:100%;" @scroll="scrollFn" @scrolltolower="toLow" @scrolltoupper="test">
            <a :href="'/pages/article/main?id='+item.id" class="feed-li" v-for="(item,index) in list" :key="index">
                <div class="feed-title">
                    <type-block :item="item"></type-block>
                    <p>{{item.title}}</p>
                </div>
                <div class="feed-content">
                    <avatar :user="item.author"></avatar>
                    <div class="feed-right">
                        <div class="feed-right-top">
                            <div class="avatar-name">
                                {{item.author.loginname}}
                            </div>
                            <div class="count">
                                <span>{{item.reply_count}}</span>&nbsp;/&nbsp;{{item.visit_count}}
                            </div>
                        </div>
                        <div class="feed-right-bottom">
                            <div class="feed-time">
                                {{item.createTime}}
                            </div>
                            <div class="feed-pass">
                                {{item.lastReplyTime}}
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </scroll-view>
    </div>
</template>
<script>
import fly from '@/utils/fly'
import typeBlock from '@/components/type-block'
import avatar from '@/components/avatar'
export default {
    name: "",
    data() {
        return {
            articleList: [],
            page: 1,
        }
    },
    props: ['currentTab'],
    methods: {
        test(){
            console.log('test')
        },
        async getList(page = 1) {
            wx.showLoading({
                title: '加载中',
            })
            let res = await fly.get('topics', {
                tab: this.currentTab.type,
                page,
                limit: 20,
            })
            if (res.success) {
                this.articleList = this.articleList.concat(res.data);
            }
            wx.hideLoading()
        },
        goArticle(item) {
            wx.navigateTo({
                url: '/pages/article/main?id=' + item.id
            })
        },
        scrollFn(e) {
            // console.log(e)
        },
        async getA() {
            return 'a';
        },
        toLow(e) {
            // 这里就是滚动到底部了
            this.page++;
            this.getList(this.page)
        }
    },
    computed: {
        list() {
            return this.articleList.map(item => {
                delete item.content
                return Object.assign(item, {
                    createTime: this.formatTime(item.create_at),
                    lastReplyTime: this.fromNow(item.last_reply_at),
                })
            })
        }
    },
    components: {
        typeBlock,
        avatar,
    },
    async created() {
        this.getList();
    }
}
</script>
<style lang="scss" scoped>
.content {
    height: 100%;
    .feed-li {
        padding: 10px;
        border-bottom: 1px solid $grey-border;
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
        .feed-content {
            display: flex;
            position: relative;
            font-size: 13px;
            margin-top: 8px;
            .feed-right {
                flex: 1;
                min-width: 0;
                margin-left: 8px;
                .feed-right-top {
                    display: flex;
                    justify-content: space-between;
                    .author-name {}
                    .count {
                        span {
                            color: $light-color;
                        }
                    }
                }
                .feed-right-bottom {
                    margin-top: 4px;
                    display: flex;
                    justify-content: space-between;
                    .feed-time {
                        font-size: 12px;
                        color: #666;
                    }
                }
            }
        }
    }
}
</style>
