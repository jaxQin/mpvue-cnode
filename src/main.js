import Vue from 'vue'
import App from './App'
// 字体组件
import icon from '@/components/icons.js'
Vue.use(icon)

// 导入过滤器
import * as filters from '@/common/js/filters'

Object.keys(filters).forEach(key=>{
    Vue.use(filters[key])
})
Vue.use(filters)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
    // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages: ['^pages/index/main','pages/article/main','pages/user/main'],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'cnode社区',
            navigationBarTextStyle: 'black'
        }
    }
}
