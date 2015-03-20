var config = {};

config.ENV            = process.env.NODE_ENV || 'development';
config.ISOMORPHIC     = process.env.ISOMORPHIC || true;

module.exports = config;