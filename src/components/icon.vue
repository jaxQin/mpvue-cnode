<template>
    <text :class="classes" :style="styles"></text>
</template>
<script>
const prefixCls = 'iconfont icon-';
export default {
    name: 'icon',
    props: {
        type: String,
        size: [Number, String],
        color: String
    },
    created() {
        console.log(999)
        console.log(this.type)
        console.log(this.styles)
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
            let str=[]
            Object.keys(style).forEach(key => {
                str.push(`${key}:${style[key]};`)
            })
            return str.join(';');
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../static/font.css';
</style>
