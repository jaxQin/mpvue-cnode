<template>
    <div class="user-wrap">
        <div class="user-head-wrap">
            <div class="avatar">
                <avatar v-if="author" :user="author" :size="90"></avatar>
            </div>
            <div class="name-wrap" v-if="user">
                <div class="name">
                    {{user.loginname}}
                </div>
                <div class="link">
                    {{user.githubUsername}}@github.com
                </div>
            </div>
            <div class="info">
                注册时间：
            </div>
            <button @tap="getAnswer">ceshi</button>
        </div>
    </div>
</template>
<script>
import fly from '@/utils/fly'
import typeBlock from '@/components/type-block'
import icon from '@/components/icon'
import avatar from '@/components/avatar'
import wxParse from 'mpvue-wxparse';
import {
    pick,
    debounce
} from 'lodash'

export default {
    name: "article",
    data() {
        return {
            article: null,
            user: null,
            author: null,
            test: '<span>sss</span>'
        }
    },
    methods: {
        getAnswer: _.debounce(
            function() {
                console.log(89999)
            },
            // 这是我们为用户停止输入等待的毫秒数
            500
        ),
        // 获取用户信息
        async getUserInfo(id) {
            let res
            try {
                res = await fly.get('user/' + id);
            } catch (err) {
                console.log(err)
            }
            console.log(res)
            if (res.success) {
                //处理注册时间
                let {
                    create_at
                } = res.data;
                create_at = this.fromNow(create_at);
                this.user = Object.assign(res.data, {
                    create_at,
                });
            }
            this.author = pick(this.user, ['loginname', 'avatar_url'])

            console.log(this.author)
        },

    },
    components: {
        typeBlock,
        icon,
        wxParse,
        avatar,
    },
    async onLoad() {
        const {
            id
        } = this.$root.$mp.query;
        wx.showLoading({
            title: '加载中',
        })
        this.getUserInfo(id)
        wx.hideLoading()
    }
}
</script>
<style lang="scss" scoped>
.user-wrap {
    .user-head-wrap {
        text-align: center;
        height: 200px;
        background-image: url('https://s1.ax1x.com/2018/03/30/9vIWkR.jpg');
        padding-top: 20px;
        .avatar {
            margin: 0 auto;
            width: 90px;
        }
        .name-wrap {
            text-align: center;
            color: #fff;
            .name {
                font-size: 18px;
                margin-top: 8px;
            }
            .link {
                margin-top: 8px;
                text-decoration: underline;
                color: #999;
            }
            .info {
                padding: 0 16px;
                position: relative;
                color: #fff;
                margin-top: 8px;
                span {
                    color: $light-color;
                }
            }
        }
    }
}
</style>
