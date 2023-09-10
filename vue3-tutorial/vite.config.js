import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx'; //支持jsx语法

//自动导入入element-plus组件
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // vite 配置
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    base: env.VITE_BASE_URL,
    build: {
      rollupOptions: {}
    },
    plugins: [
      vue(),
      VueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
    // build: {
    //   //多页面配置
    //     rollupOptions: {
    //         input: {
    //             index: path.resolve(__dirname, 'index.html'),
    //             about: path.resolve(__dirname, 'about.html'),
    //         }, output: {
    //             chunkFileNames: 'static/js/[name]-[hash].js',
    //             entryFileNames: "static/js/[name]-[hash].js",
    //             assetFileNames: "static/[ext]/name-[hash].[ext]"
    //         }
    //     },
    // }
  };
});
