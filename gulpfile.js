var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var rsync = require('gulp-rsync');

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

for (var host in config.rsync) {
  gulp.task('rsync:' + host, ['build'], function() {
    gulp.src(['./build/*', './videos/*', './index.html'])
      .pipe(rsync(config.rsync[host]));
  });
}
