import { fileURLToPath, URL } from 'url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import themePreprocessorPlugin from "@zougt/vite-plugin-theme-preprocessor"
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  optimizeDeps: {
    exclude: ["@zougt/vite-plugin-theme-preprocessor/dist/browser-utils"],
  },
  plugins: [
    vue(), 
    vueJsx(),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: "less" })],
    }),
    themePreprocessorPlugin({
      less: {
        arbitraryMode: false,
        multipleScopeVars: [
          {
            scopeName: 'cyan',
            path: path.resolve('src/theme/cyan.less'),
          },
          {
            scopeName: 'default',
            path: path.resolve('src/theme/default.less'),
          }
        ],
        defaultScopeName: 'cyan',
        extract: false
      },
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
