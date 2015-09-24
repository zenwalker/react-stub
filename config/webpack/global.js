var path = require('path');
var webpack = require('webpack');
var extend = require('util')._extend;
var autoprefixer = require('autoprefixer-core');
var HtmlPlugin = require('html-webpack-plugin');

module.exports = function(dirname) {
  return {
    context: dirname,
    entry: {
      vendor: Object.keys(require(dirname + '/package').dependencies),
      app: 'app'
    },
    output: {
      path: path.join(dirname, 'build'),
      filename: 'bundle.js'
    },
    resolve: {
      root: dirname,
      extensions: ['', '.js', '.jsx']
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new HtmlPlugin({
        template: path.join(dirname, 'app/index.html'),
        chunks: ['app', 'vendor'],
        filename: 'index.html'
      })
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
      },{
        test: /\.css$/,
        loaders: ['style', 'css'],
      },{
        test: /\.styl$/,
        loaders: ['style', 'css', 'postcss', 'stylus']
      },{
        test: /\.(jpg|png|woff)$/,
        loaders: ['url?limit=10000']
      },{
        test: /\.svg$/,
        loaders: ['react-svgdom', 'svgo']
      },{
        test: /.json$/,
        loader: 'json'
      }]
    },
    postcss: [
      autoprefixer()
    ],
    stylus: {
      import: [
        dirname + '/styles/variables.styl',
        dirname + '/styles/mixins.styl'
      ]
    }
  }
};
