// webpack.config.js
module.exports = {
    // 其他配置...
    module: {
      rules: [
        {
          // 匹配需要处理的文件类型
          test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                // 输出文件的名称模板
                name: '[name].[hash:8].[ext]',
                // 输出路径（相对于 output 目录）
                outputPath: 'assets/',
                // 公共路径（用于引用资源）
                publicPath: 'assets/',
                // 是否保留原始文件路径
                useRelativePath: false,
                // 是否输出文件（默认 true）
                emitFile: true
              }
            }
          ]
        }
      ]
    }
  }