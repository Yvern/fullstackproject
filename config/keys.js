//keys.js - figure out what set of credentials to return: prod or devDependencies

if (process.env.NODE_ENV === 'production') {
  //we are in production, return prod keys
  console.log(process.env.NODE_ENV);
  module.exports = require('./prod');
} else {
  //we are in development, return dev keys
  module.exports = require('./dev');
}
