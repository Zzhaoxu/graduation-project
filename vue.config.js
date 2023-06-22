/*
 * @Descripttion: 
 * @version: 
 * @Author: 00289
 * @Date: 2022-03-16 22:16:17
 * @LastEditors: Zzhaoxu
 * @LastEditTime: 2022-06-05 18:57:04
 */
module.exports = {
  // 关闭eslint检测
  overlay: {
    warnings: false,
    errors: false
},
  lintOnSave: false,
  productionSourceMap: false, // 打包时不会生成.map文件，加快打包速度
}
