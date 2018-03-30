<template>
    <div class="feed-label feed-label-top" v-if="item.top">
        置顶
    </div>
    <div class="feed-label feed-label-top" v-else-if="item.good">
        精华
    </div>
    <div class="feed-label feed-label-other" v-else>
        {{type}}
    </div>
</template>
<script>
export default {
    name: "",
    props: ['item'],
    computed: {
        type() {
            return this.getTopicType(this.item.tab)
        }
    },
}
</script>
<style lang="scss" scoped>
.feed-label {
    font-size: 12px;
    border-radius: 4px;
    padding: 0 5px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    flex-shrink: 0;
    box-sizing: border-box;
    &.feed-label-other {
        background-color: #e3e3e3;
        color: #333;
    }
    &.feed-label-top {
        background-color: $light-color;
        color: #fff;
    }
}
</style>
