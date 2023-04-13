import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 导入svg
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const pathSrc = path.resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // allin({ presets: [preset()] }),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: false })]
    }),
    Components({
      dirs: ['src/components/'],
      // 配置需要将哪些后缀类型的文件进行自动按需引入
      extensions: ['vue'],
      resolvers: [ElementPlusResolver({ importStyle: false })]
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'svg-[dir]-[name]'
    })
  ],
  define: { 'process.env': {}, 'process.platform': {} },
  resolve: {
    alias: {
      '~/': `${pathSrc}/`,
      '@/': `${pathSrc}/`
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
  }
})
