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
