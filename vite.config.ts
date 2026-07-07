import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'

const cesiumRootDir = fileURLToPath(new URL('./src/Assets/Cesium/', import.meta.url))
const cesiumStaticRoutes = [
  { prefix: '/Cesium/Assets/', dir: cesiumRootDir },
  { prefix: '/Cesium/Workers/', dir: resolve(cesiumRootDir, 'Workers') },
  { prefix: '/Cesium/ThirdParty/', dir: resolve(cesiumRootDir, 'ThirdParty') },
  { prefix: '/Cesium/Widgets/', dir: resolve(cesiumRootDir, 'Widgets') },
]
const mimeTypes: Record<string, string> = {
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
}

function serveCesiumAssets(): Plugin {
  return {
    name: 'serve-cesium-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname)
        const route = cesiumStaticRoutes.find(({ prefix }) => pathname.startsWith(prefix))

        if (!route) {
          next()
          return
        }

        const filePath = resolve(route.dir, pathname.slice(route.prefix.length))

        if (!filePath.startsWith(route.dir) || !existsSync(filePath) || !statSync(filePath).isFile()) {
          next()
          return
        }

        res.setHeader('Content-Type', mimeTypes[extname(filePath)] ?? 'application/octet-stream')
        createReadStream(filePath).pipe(res)
      })
    },
  }
}
export default defineConfig({
  // 让 Vite 将 .gltf 和 .glb 文件视为静态资源处理
  assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.geojson'],
  plugins: [
    serveCesiumAssets(),
    glsl({
      include: [                   // 要处理的文件类型
        '**/*.glsl',
        '**/*.wgsl',
        '**/*.vert',
        '**/*.frag',
        '**/*.vs',
        '**/*.fs',
        '**/*.glsl'
      ],
      exclude: undefined,          // 排除的文件
      warnDuplicatedImports: true, // 警告重复导入
      defaultExtension: 'glsl',    // 默认扩展名
      watch: true                  // 监听文件变化
    })],
  server: {
    port: 5171
  }
})
