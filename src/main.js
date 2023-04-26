import { createApp } from 'vue'
import App from './App.vue'
import svgIcon from '@/components/svgIcon'
import router from '@/router'
import pinia from '@/store'
import ElementPlus from 'element-plus'

import 'virtual:svg-icons-register'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/router/permission'
const app = createApp(App).component('svg-icon', svgIcon).use(router).use(pinia).use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// app.config.globalProperties.$apis = apis
app.mount('#app')
