const TokenKey = 'Admin-Token'
const UserKey = 'User-Info'

/*******
 * @ description: 获取token
 * @ return {*}
 ******/
export function getToken() {
  return localStorage.getItem(TokenKey) || '9527'
}

/*******
 * @ description: 存储token
 * @ param {*} token
 * @ return {*}
 ******/
export function setToken(token) {
  localStorage.setItem(TokenKey, token)
}

/*******
 * @ description: 删除token
 * @ return {*}
 ******/
export function removeToken() {
  localStorage.removeItem(TokenKey)
}

/*******
 * @ description: 获取用户信息
 * @ return {*}
 ******/
export function getUserInformation() {
  let userInfo = localStorage.getItem(UserKey)
  if (userInfo) {
    return JSON.parse(userInfo)
  }
}

/*******
 * @ description: 存储用户信息
 * @ param {*} data
 * @ return {*}
 ******/
export function setUserInfo(data) {
  if (data) {
    data = JSON.stringify(data)
    localStorage.setItem(UserKey, data)
  }
}

/*******
 * @ description: 删除用户信息
 * @ return {*}
 ******/
export function removeUserInfo() {
  localStorage.removeItem(UserKey)
}
