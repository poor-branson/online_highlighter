const merge = require('webpack-merge')
const base = require('./webpack.base');
const webpack = require('webpack')
const DevServer = require('webpack-dev-server');
const { copyHLStyle } = require('./util.js')

const hlThemes = copyHLStyle();

const compilerConfig =  merge(base, {
  mode: 'development',
  devtool: "cheap-module-source-map",
  entry: {
    app: [
      'webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/dev-server'
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __THEME_LIST__: JSON.stringify(hlThemes)
    })
  ]
})

const compiler = webpack(compilerConfig);
const server = new DevServer(compiler, {
  port: 8080,
  host: '0.0.0.0',
  disableHostCheck: true,
  publicPath: '/',
  noInfo: true,
  stats: 'minimal',
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000,
    aggregateTimeout: 600
  }
})

server.listen(8080, "0.0.0.0", err => {
  if (err)
    console.error(err);
})