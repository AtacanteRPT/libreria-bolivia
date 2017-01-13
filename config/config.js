var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'libreria-bolivia'
    },
    port: process.env.PORT || 3000,
    // db: 'mysql://root:libreria-bolivia@104.155.155.66/libreria-bolivia-development'
    db: 'mysql://root@127.0.0.1/libreria-bolivia-development'

  },

  test: {
    root: rootPath,
    app: {
      name: 'libreria-bolivia'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://root:libreria-bolivia@104.155.155.66/libreria-bolivia-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'libreria-bolivia'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://root:libreria-bolivia@104.155.155.66/libreria-bolivia-production'
  }
};

module.exports = config[env];
