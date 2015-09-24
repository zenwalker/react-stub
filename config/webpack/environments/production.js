module.exports = function(dirname) {
  var webpack = require('webpack');

  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false }
      })
    ]
  };
};
