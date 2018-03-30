<template>
    <!-- <div :href="href"> -->
        <div class="avatar" :style="style" @tap.stop="goUser">
            <img :src="user.avatar_url" alt="用户头像">
        </div>
    <!-- </div> -->
</template>
<script>
export default {
    name: "avatar",
    props: ['user', 'size'],
    methods:{
        goUser(){
            wx.navigateTo({
                url:this.href
            })
        }
    },
    computed: {
        href(){
            return '/pages/user/main?id='+this.user.loginname;
        },
        style() {
            if (!this.size) return ''
            else {
                let style = {};
                let str=[]
                if (this.size) {
                    style['width'] = `${this.size}px`;
                    style['height'] = `${this.size}px`;
                }
                Object.keys(style).forEach(key => {
                    str.push(`${key}:${style[key]};`)
                })
                return str.join(';');
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.avatar {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    border-radius: 50%;
    overflow: hidden;
    // position: relative;
    // z-index:99;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
