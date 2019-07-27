module.exports = function(router) {
  router.post('/drug-related-pers/graph', async ctx => {
    // const { phone_nums } = ctx.request.body;
    ctx.body = require('./fakedata/drug/graph.json');
  });
  router.get('/drug-related-pers/:phoneNumber', async ctx => {
    // const { phoneNumber } = ctx.params;
    const data = require('./fakedata/drug/person.json');
    ctx.body = data;
  });
  router.post('/whoring-related-pers/graph', async ctx => {
    // const { phone_nums } = ctx.request.body;
    ctx.body = require('./fakedata/whoring/graph.json');
  });
  router.get('/whoring-related-pers/:phoneNumber', async ctx => {
    // const { phoneNumber } = ctx.params;
    const data = require('./fakedata/whoring/person.json');
    ctx.body = data;
  });
  router.get('/fraud-info/:phoneNumber', async ctx => {
    // const { phoneNumber } = ctx.params;
    const data = require('./fakedata/fraud/data.json');
    ctx.body = data;
  });
};
