import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import { resolve } from 'path'



// https://vitejs.dev/config/
export default defineConfig({
   // base: process.env.NODE_ENV === 'development' ? '/' : '/research/',
    server: {
        port: 3000,
        strictPort: true,
        hmr: {
            overlay: false
        },
    },
    plugins: [
        vue(),
        legacy({
            targets: ['defaults', 'ie >= 11', 'chrome 52'],  //需要兼容的目标列表，可以设置多个
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
            renderLegacyChunks: true,
            polyfills: [
                'es.symbol',
                'es.array.filter',
                'es.promise',
                'es.promise.finally',
                'es/map',
                'es/set',
                'es.array.for-each',
                'es.object.define-properties',
                'es.object.define-property',
                'es.object.get-own-property-descriptor',
                'es.object.get-own-property-descriptors',
                'es.object.keys',
                'es.object.to-string',
                'web.dom-collections.for-each',
                'esnext.global-this',
                'esnext.string.match-all'
            ]
        }),

    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm-bundler.js',
            "@": resolve(__dirname, "./src"),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    esbuild: {
        drop: ['console', 'debugger']
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: {
                        'primary-color': '#1890ff',
                    },
                },
            }
        }
    }
})