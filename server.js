var config = require('./webpack.config')({ env: 'dev' });
var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');

var proxy = {
  local: {
    '/api/*': {
      target: 'http://localhost:8000'
    }
  }
};

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  proxy: proxy.local,
  hot: true
})
.listen(3000, 'localhost', function(err) {
  if (err) {
    throw new gutil.PluginError('webpack', err);
  }
  console.log('Listening at localhost:3000');
});
