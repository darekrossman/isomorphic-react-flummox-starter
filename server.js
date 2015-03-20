// Create koa app
require("babel/register")({
  experimental: true
});

var koa = require('koa');
var routes = require('./routes/index')
var colors = require('colors');

var app = koa();

routes(app);

app.on('error', function(error){
  console.log('ERROR', error)
})

var port = process.env.PORT || 5000;

app.listen(port);

var pid = '['.green + process.pid + ']'.green;
var portString = port + '';
var logMsg = pid.white + ': App listening on port '.green + portString.yellow;
console.log('\n------------------------------------\n'.gray);
console.log(logMsg);
console.log('\n------------------------------------\n'.gray);

module.exports = app;