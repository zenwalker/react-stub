module.exports = function(dirname) {
  var webpack = require('webpack');

  var proxy = {
    local: {
      '/api/*': {
        target: 'http://localhost:8000'
      }
    },
    dev: {
      '/api/*': {
        target: 'http://example.com',
        headers: {
          'HOST': 'example.com'
        }
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
      // proxy: proxy.local,
      inline: true,
      info: true,
      hot: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};
