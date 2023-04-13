import request from '../../requests'

const BASE_URL = '/common/'

/*******
 * @ description: 获取面额列表
 * @ param {*} params
 * @ return {*}
 ******/
export function getList(params) {
  return request({
    url: BASE_URL + 'top/up/all',
    method: 'get',
    params
  })
}
