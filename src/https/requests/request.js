import axios from 'axios'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/store/user'
import pinia from '@/store'
import { filterEmptyParams } from '@/utils'

const NotShowLoadingArr = ['/user/order/get', '/user/douyin/monitor/processing/list']

let store = null
let hasPermission = true
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 8000
})
let loading
service.interceptors.request.use(
  (config) => {
    // 过滤空参数
    if (!config.allowEmpty) {
      config.params && (config.params = filterEmptyParams(config.params))
      config.data && (config.data = filterEmptyParams(config.data))
    }

    if (store === null) {
      store = useUserStore(pinia)
    }
    if (!NotShowLoadingArr.includes(config.url)) {
      loading = ElLoading.service({ fullscreen: true, text: '加载中' })
    } else {
      if (!hasPermission) {
        return Promise.reject(new Error('NO_PERMISSION'))
      }
    }
    if (store.getToken()) {
      config.headers['token'] = store.getToken()
      // config.headers['Authorization'] = 'Bearer ' + store.getToken()
    }
    return config
  },
  (error) => {
    console.log(error) // for debug
    loading && loading.close()
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (res) => {
    loading && loading.close()
    if (res.data.code !== 0) {
      if (res.config.url == '/user/douyin/monitor/processing/list' && res.data.code == 1) {
        hasPermission = false
      }
      ElMessage({
        message: res.data.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
    if ([11012, 11011, 11013, 11014, 11015, 11016].includes(res.data.code)) {
      ElMessage({
        message: res.data.message || '登录过期，重新登录!!!',
        type: 'error',
        duration: 5 * 1000
      })
      store.removeToken()
      location.reload()
    }
    if (res.config.url == '/user/douyin/monitor/processing/list' && res.data.code == 0) {
      hasPermission = true
    }

    return res.data
  },
  (error) => {
    loading && loading.close()
    console.log('===error===', error)
    return Promise.reject(error)
  }
)

export default service
