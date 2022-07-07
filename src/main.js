import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Antd, { message } from 'ant-design-vue'
import infiniteScroll from 'vue3-infinite-scroll-good'

import 'ant-design-vue/dist/antd.css'
import './styles/app.less'

const app = createApp(App)

app.config.errorHandler = err => {
    message.error(err.message)
}

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(infiniteScroll)

app.mount('#app')
