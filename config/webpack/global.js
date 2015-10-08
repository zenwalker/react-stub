var path = require('path');
var webpack = require('webpack');
var extend = require('util')._extend;
var autoprefixer = require('autoprefixer-core');
var HtmlPlugin = require('html-webpack-plugin');

module.exports = function(dirname) {
  var vendor = Object.keys(require(dirname + '/package').dependencies);
  vendor.push('babel-core/polyfill');

  return {
    context: dirname,
    entry: {
      vendor: vendor,
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
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
        { test: /\.(jpg|png|woff)$/, loader: 'url?limit=10000' },
        { test: /\.svg$/, loaders: ['react-svgdom', 'svgo'] },
        { test: /\.json$/, loader: 'json' }
      ]
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
        template: path.join(dirname, 'app', 'index.html'),
        chunks: ['app', 'vendor'],
        filename: 'index.html'
      })
    ],
    postcss: [
      autoprefixer()
    ],
    stylus: {
      import: [
        path.join(dirname, 'app', 'styles', 'variables.styl'),
        path.join(dirname, 'app', 'styles' , 'mixins.styl')
      ]
    }
  }
};
