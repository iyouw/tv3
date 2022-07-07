import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue'
import infiniteScroll from 'vue3-infinite-scroll-good'

import 'ant-design-vue/dist/antd.css'
import './styles/app.less'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(infiniteScroll)

app.mount('#app')
