<template>
    <text :class="classes" :style="styles"></text>
</template>
<script>
const prefixCls = 'iconfont icon-';
import {
    obj2style
} from '@/common/js/basic';
export default {
    name: 'icon',
    props: {
        type: String,
        size: [Number, String],
        color: String
    },
    computed: {
        classes() {
            return `${prefixCls}${this.type}`;
        },
        styles() {
            let style = {};
            if (this.size) {
                style['font-size'] = `${this.size}px`;
            }
            if (this.color) {
                style.color = this.color;
            }
            return obj2style(style)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../static/font.css';
</style>
