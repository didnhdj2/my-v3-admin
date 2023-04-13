import request from '../../requests'

const BASE_URL = '/user/douyin/monitor/'

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
 * @ description: 进行中列表
 * @ param {*} params
 * @ return {*}
 ******/
export function onGoList(params) {
  return request({
    url: BASE_URL + 'processing/list',
    method: 'get',
    params
  })
}

/*******
 * @ description:分页获取
 * @ param {*} params
 * @ return {*}
 ******/
export function pages(params) {
  return request({
    url: BASE_URL + 'page',
    method: 'get',
    params
  })
}
/*******
 * @ description:历史记录
 * @ param {*} params
 * @ return {*}
 ******/
export function history(params) {
  return request({
    url: BASE_URL + 'history',
    method: 'get',
    params
  })
}
