import request from '../requests'

const BASE_URL = '/user/'

export function login(data) {
  return request({
    url: 'login',
    method: 'post',
    data
  })
}

export function getUserInfo(params) {
  return request({
    url: BASE_URL + 'info',
    method: 'get',
    params
  })
}
export function cancelOrder(params) {
  return request({
    url: BASE_URL + 'order/cancel',
    method: 'get',
    params
  })
}
export function orderGet(params) {
  return request({
    url: BASE_URL + 'order/get',
    method: 'get',
    params
  })
}

export function getCaptcha(params) {
  return request({
    url: '/captcha/get',
    method: 'get',
    params
  })
}

export function createOrder(data) {
  return request({
    url: BASE_URL + 'order/top/up',
    method: 'post',
    data
  })
}
export function buyVip(data) {
  return request({
    url: BASE_URL + 'order/monitor/vip',
    method: 'post',
    data
  })
}
