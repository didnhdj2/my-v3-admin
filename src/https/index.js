// // 引入所有api下的文件
// const files = import.meta.glob('./apis/*.js', { eager: true })
// //使用webpack 中带的require.context方法 (路径，是否递归，后缀名)
// const apis = {}

// Object.keys(files).forEach((key) => {
//   //使用path模块去获取文件名
//   const key_list = key
//     .replace('.js', '')
//     .split('/')
//     .filter((item) => item != '.')
//   const name = key_list.join('_')
//   //兼容默认导出 和 分别导出，如果有多个分别导出，会全部导出
//   apis[name] = files[key].default || files[key]
// })
// // 把对象默认导出
// export default apis
