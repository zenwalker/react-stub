module.exports = function(dirname) {
  var TextPlugin = require('extract-text-webpack-plugin');
  var webpack = require('webpack');

  return {
    debug: false,
    devtool: 'cheap-source-map',

    module: {
      loaders: [
        { test: /\.styl$/, loader: TextPlugin.extract('style', 'css!postcss!stylus') },
        { test: /\.css$/, loader: TextPlugin.extract('style', 'css') },
      ]
    },
    plugins: [
      new TextPlugin('styles.css'),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false }
      })
    ]
  };
};
