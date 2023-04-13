import request from '../requests'

/*******
 * @ description: 通用删除数据的方法
 * @ param {*} params 请求参数
 * @ param {*} pageName 传入的页面路径
 * @ return {*}
 ******/
export function remove(data, pageName) {
  return request({
    url: `/${pageName}/delete`,
    method: 'post',
    data
  })
}
/*******
 * @ description: 通用新增数据&编辑数据的方法
 * @ param {*} params 请求参数
 * @ param {*} pageName 传入的页面路径
 * @ return {*}
 ******/
export function edit(data, pageName) {
  if (data && data.id) {
    return request({
      url: `/${pageName}/edit`,
      method: 'post',
      data
    })
  }
  return request({
    url: `/${pageName}/add`,
    method: 'post',
    data
  })
}
/*******
 * @ description:  通用获取列表数据的方法
 * @ param {*} params 请求参数
 * @ param {*} pageName 传入的页面路径
 * @ return {*}
 ******/
export function list(params, pageName) {
  return request({
    url: `/${pageName}/page`,
    method: 'get',
    params
  })
}
/*******
 * @ description: 通用获取单个数据的方法
 * @ param {*} params 请求参数
 * @ param {*} pageName 传入的页面路径
 * @ return {*}
 ******/
export function get(params, pageName) {
  return request({
    url: `/${pageName}/get`,
    method: 'get',
    params
  })
}
