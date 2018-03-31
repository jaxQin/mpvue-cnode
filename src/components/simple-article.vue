<template>
    <!-- 文章简单信息展示，用于user页面 -->
    <div class="feed-content">
        <div class="avatar"><img alt="headImgUrl" src="https://avatars0.githubusercontent.com/u/29669264?v=4&amp;s=120" lazy="loaded"></div>
        <div class="feed-right">
            <div class="feed-right-top">
                <div class="feed-title">
                    <p>node怎样向文件*.xlsx中追加内容</p>
                </div>
            </div>
            <div class="feed-right-bottom">
                <div class="feed-time"><span>lovegnep</span></div>
                <div class="feed-pass">
                    1个月前
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: ""
}
</script>
<style lang="scss" scoped>
.feed-content {
    margin-top: 0;
    .feed-right {
        flex: 1;
        min-width: 0;
        margin-left: 8px;
        .feed-right-top {
            display: flex;
            justify-content: space-between;
        }
        .feed-right-bottom {
            display: flex;
            justify-content: space-between;
            .feed-time {
                font-size: 12px;
                color: #666;
                margin-left: 8px;
            }
        }
    }
}
</style>
