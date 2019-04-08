const webpack = require('webpack')
const path = require('path')
const { NODE_ENV } = process.env

function resolve(dir) {
  return path.join(__dirname, dir)
}

let config = {
  entry: ['./lib/web-pinyin.js'],
  output: {
    path: resolve('./dist'),
    filename: 'web-pinyin.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('lib')]
      }
    ]
  },
  plugins: []
}

// for production build
if (NODE_ENV === 'production') {
  // config.babel.plugins.push('transform-runtime')
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      VERSION: JSON.stringify(require('./package.json').version)
    })
  )
} else if (NODE_ENV === 'development') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
      VERSION: JSON.stringify(require('./package.json').version)
    })
  )
  config = Object.assign(config, {
    entry: './example/index.js',
    output: {
      path: path.resolve(__dirname, 'example'),
      filename: 'example.js'
    },
    devtool: 'eval'
  })
}

module.exports = config
