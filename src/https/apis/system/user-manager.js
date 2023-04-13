import request from '../../requests'

const BASE_URL = '/admin/user/'

/*******
 * @ description: 新增
 * @ param {*} data
 * @ return {*}
 ******/
export function add(data) {
  return request({
    url: BASE_URL + 'add',
    method: 'post',
    data
  })
}
/*******
 * @ description: 编辑
 * @ param {*} data
 * @ return {*}
 ******/
export function edit(data) {
  return request({
    url: BASE_URL + 'edit',
    method: 'post',
    data
  })
}
/*******
 * @ description: 删除
 * @ param {*} data
 * @ return {*}
 ******/
export function remove(data) {
  return request({
    url: BASE_URL + 'delete',
    method: 'post',
    data
  })
}
/*******
 * @ description: 新增
 * @ param {*} data
 * @ return {*}
 ******/
export function charge(data) {
  return request({
    url: BASE_URL + 'top/up',
    method: 'post',
    data
  })
}

/*******
 * @ description: 获取单个用户
 * @ param {*} params
 * @ return {*}
 ******/
export function get(params) {
  return request({
    url: BASE_URL + 'get',
    method: 'get',
    params
  })
}
/*******
 * @ description: 分页列表
 * @ param {*} params
 * @ return {*}
 ******/
export function page(params) {
  return request({
    url: BASE_URL + 'page',
    method: 'get',
    params
  })
}
