const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlPlugin = require('html-webpack-plugin');
const TextPlugin = require('extract-text-webpack-plugin');
const dependencies = Object.keys(require(__dirname + '/package').dependencies);
const configs = {};

/**
 * Global
 */

configs.global = (dirname) => {
  return {
    context: dirname,
    entry: {
      vendor: dependencies,
      app: 'app',
    },
    output: {
      path: path.join(dirname, 'build'),
      filename: '[name].js',
    },
    resolve: {
      root: dirname,
      extensions: ['', '.js', '.jsx'],
    },
    module: {
      preLoaders: [
        { test: /\.svg/, loader: 'svgo' },
      ],
      loaders: [
        { test: /\.svg$/, loader: 'react-svgdom' },
        { test: /\.(jpg|png|ttf|woff|woff2|gif)$/, loader: 'url?limit=10000' },
        { test: /\.(mp4|webm|ogv|mp3|ogg|wav)/, loader: 'file' },
        { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
        { test: /\.json$/, loader: 'json' },
      ],
    },
    resolveLoader: {
      alias: {
        'svg-icon': 'react-svgdom',
      },
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new HtmlPlugin({
        template: path.join(dirname, 'app', 'index.html'),
        chunks: ['app', 'vendor'],
        filename: 'index.html',
        inject: true,
      }),
    ],
    postcss: [
      autoprefixer(),
    ],
    stylus: {
      import: [
        path.join(dirname, 'app', 'styles', 'variables.styl'),
        path.join(dirname, 'app', 'styles', 'mixins.styl'),
      ],
    },
  };
};

/**
 * Development
 */

configs.development = () => {
  const proxy = {
    local: {
      '/api/*': {
        target: 'http://localhost:8000',
      },
    },
  };

  return {
    devServer: {
      historyApiFallback: true,
      proxy: proxy.local,
      inline: true,
      info: true,
      hot: true,
    },
    module: {
      loaders: [
        { test: /\.styl$/, loaders: ['style', 'css', 'postcss', 'stylus'] },
        { test: /\.css$/, loaders: ['style', 'css', 'postcss'] },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
};

/**
 * Production
 */

configs.production = () => {
  return {
    debug: false,
    devtool: 'cheap-source-map',

    module: {
      loaders: [
        { test: /\.css$/, loader: TextPlugin.extract('style', 'css!postcss') },
        { test: /\.styl$/, loader: TextPlugin.extract('style', 'css!postcss!stylus') },
      ],
    },
    plugins: [
      new TextPlugin('[name].css', {
        allChunks: true,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false },
      }),
    ],
  };
};

const load = (enviroment) => {
  if (!enviroment) throw 'Can\'t find local enviroment variable via process.env.NODE_ENV';
  if (!configs[enviroment]) throw 'Can\'t find enviroments see _congigs object';

  return configs && _.mergeWith(
    configs.global(__dirname),
    configs[enviroment](__dirname),
    (a, b) => {
      if (_.isArray(a)) {
        return a.concat(b);
      }
    }
  );
};

module.exports = load(process.env.NODE_ENV);
