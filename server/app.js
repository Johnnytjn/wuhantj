require('dotenv').config();
var Koa = require('koa');
var Router = require('koa-router');
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const historyApiFallback = require('koa-history-api-fallback');
const koaStatic = require('koa-static');
const compress = require('koa-compress');

var app = new Koa();
var router = new Router();

app.use(bodyParser());
app.use(koaStatic(path.resolve('dist')));

require('./router')(router);

app.use(router.routes()).use(router.allowedMethods());
app.use(historyApiFallback());
app.use(compress({}));

https
  .createServer(
    {
      key: fs.readFileSync(path.join(__dirname, 'certs/key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'certs/cert.pem'))
    },
    app.callback()
  )
  .listen(process.env.SERVER_PORT || 8000);
