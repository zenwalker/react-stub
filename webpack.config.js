var _ = require('lodash');

var configs = {
  global: require(__dirname + '/config/webpack/global'),
  production: require(__dirname + '/config/webpack/environments/production'),
  development: require(__dirname + '/config/webpack/environments/development')
};

var load = function(enviroment) {
  if (!enviroment) throw 'Can\'t find local enviroment variable via process.env.NODE_ENV';
  if (!configs[enviroment]) throw 'Can\'t find enviroments see _congigs object';

  return configs && _.merge(
    configs['global'](__dirname),
    configs[enviroment](__dirname),

    function(a, b) {
      if (_.isArray(a)) {
        return a.concat(b);
      }
    }
  );
}

module.exports = load(process.env.NODE_ENV);
