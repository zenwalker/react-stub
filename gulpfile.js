var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var rsync = require('gulp-rsync');

var config = {
  webpack: require('./webpack.config'),

  rsync: {
    files: [
      './build/*',
      './index.html'
    ],
    dev: {
      hostname: '',
      username: '',
      destination: ''
    },
    prod: {
      hostname: '',
      username: '',
      destination: ''
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

for (var _host in config.rsync) {
  if (_host == 'files') {
    continue;
  }
  (function(host) {
    gulp.task('rsync:' + host, ['build'], function() {
      gulp.src(config.rsync.files)
        .pipe(rsync(config.rsync[host]));
    });
  }(_host));
}
