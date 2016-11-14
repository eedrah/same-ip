var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin')
var UnusedFilesWebpackPlugin = require('unused-files-webpack-plugin').default

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.jsx?/,
        loaders: [
          'react-hot',
          'babel?presets[]=react&presets[]=es2015&plugins[]=transform-runtime'
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new UnusedFilesWebpackPlugin({
      pattern: 'src/**/*.*'
    }),
    new BellOnBundlerErrorPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      title: 'Eedrah',
      filename: 'index.html',
      chunks: ['index'],
      inject: false,
      template: 'node_modules/html-webpack-template/index.ejs',
      appMountId: 'app',
      googleAnalytics: {
        trackingId: 'XX-00000000-0',
        pageViewOnLoad: true
      }
    })
  ],
  progress: true
}
