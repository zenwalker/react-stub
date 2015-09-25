module.exports = function(dirname) {
  var webpack = require('webpack');

  var proxy = {
    local: {
      '/api/*': {
        target: 'http://localhost:8000'
      }
    }
  };

  return {
    module: {
      loaders: [
        { test: /\.styl$/, loaders: ['style', 'css', 'postcss', 'stylus'] },
        { test: /\.css$/, loaders: ['style', 'css'] },
      ]
    },
    devServer: {
      historyApiFallback: true,
      inline: true,
      info: true,
      hot: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};
