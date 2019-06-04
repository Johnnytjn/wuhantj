const Koa = require('koa');
const Router = require('koa-router');
const router = new Router();
const https = require('https');
const fs = require('fs');

// const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const path = require('path');

const app = new Koa();
app.keys = ['po-console'];

app.use(bodyParser());
// app.use(koaStatic(path.resolve('dist')));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = (err.response && err.response.status) || 500;
    // ctx.body = err.message;
    ctx.body = (err.response && err.response.data.message) || err.message;
    ctx.app.emit('error', err, ctx);
  }
});

require('./router')(router);
app.use(router.routes()).use(router.allowedMethods());

app.on('error', (err, ctx) => {
  console.log(err);
});

// app.listen(8000);
https
  .createServer(
    {
      key: fs.readFileSync(path.join(__dirname, 'certs/key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'certs/cert.pem'))
    },
    app.callback()
  )
  .listen(4000);
