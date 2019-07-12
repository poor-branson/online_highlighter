const base = require('./webpack.base');
const merge = require('webpack-merge')
const webpack = require('webpack');
const { copyHLStyle } = require('./util')
const { resolve } = require('path')
const rm = require('rimraf');

rm.sync(resolve(__dirname, '../dist'));

const hlThemes = copyHLStyle(resolve(__dirname, '../dist/hl-style'));

const useConfig = merge(base, {
  mode: 'production',
  output: {
    publicPath: '/highlighter/'
  },
  plugins: [
    new webpack.DefinePlugin({
      __THEME_LIST__: JSON.stringify(hlThemes)
    })
  ]
})

webpack(useConfig, err => {
  if (err)
    console.error(err);
});