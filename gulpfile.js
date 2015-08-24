var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var rsync = require('gulp-rsync');
var WebpackDevServer = require('webpack-dev-server');

var config = {
  webpack: require('./webpack.config'),

  rsync: {
    dev: {
      hostname: '',
      username: '',
      destination: '',
      progress: true
    },
    prod: {
      hostname: '',
      username: '',
      destination: '',
      progress: true
    }
  }
};

gulp.task('build', function(callback) {
  webpack(config.webpack({ env: 'prod' }), function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString());
    callback();
  });
});

gulp.task('server', function(callback) {
  var webpackConfig = config.webpack({ env: 'dev' })
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/api/*': {
        target: '',
        headers: {
          'HOST': ''
        }
      }
    }
  })
  .listen(3000, 'localhost', function(err) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    console.log('Listening at localhost:3000');
    callback();
  });
});

gulp.task('deploy:dev', ['build'], function() {
  gulp.src(['./build/*', './index.html'])
    .pipe(rsync(config.rsync.dev));
});

gulp.task('deploy:prod', ['build'], function() {
  gulp.src(['./build/*', './index.html'])
    .pipe(rsync(config.rsync.prod));
});
