const HtmlWebpackPlugin = require("html-webpack-plugin");
const AfterCompilationPlugin = require("./after-compilation-plugin");
const { resolve } = require("path");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: {
    app: [resolve(__dirname, "../source/index.js")]
  },
  output: {
    filename: 'static/js/[name].[hash:6].js',
    chunkFilename: "static/js/[id].[chunkhash].js",
    publicPath: '/',
    path: resolve(__dirname, "../dist")
  },
  externals: {
    hljs: 'highlight.js'
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "../source")
    },
    extensions: [".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg|ico)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "static/fonts/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "static/img/[name].[hash:7].[ext]"
        }
      }
    ]
  },
  plugins: [
    new AfterCompilationPlugin(function() {
      console.log("-- compile done --");
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "../source/index.html"),
      inject: "body",
      filename: "index.html"
    })
  ]
};
