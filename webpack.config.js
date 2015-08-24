var path = require('path');
var webpack = require('webpack');
var extend = require('util')._extend;
var package = require('./package.json');
var autoprefixer = require('autoprefixer-core');

module.exports = function(options) {
  var entry = ({
    dev: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './index'
    ],
    prod: './index'
  }[options.env]);

  var plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];

  if (options.env == 'prod') {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false }
      })
    );
  }

  return {
    entry: {
      app: entry,
      vendor: Object.keys(package.dependencies)
    },
    output: {
      path: path.join(__dirname, 'build'),
      publicPath: '/build/',
      filename: 'bundle.js'
    },
    resolve: {
      root: __dirname,
      extensions: ['', '.js', '.jsx']
    },
    plugins: plugins,
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
    postcss: function () {
      return [autoprefixer];
    },
    stylus: {
      import: [
        __dirname + '/styles/variables.styl',
        __dirname + '/styles/mixins.styl'
      ]
    }
  }
};
