module.exports = function(router) {
  router.post('/drug-related-pers/graph', async ctx => {
    const { phone_nums } = ctx.request.body;
    ctx.body = require('./fakedata/graph.json');
  });
  router.get('/drug-related-pers/:phoneNumber', async ctx => {
    const { phoneNumber } = ctx.params;
    const data = require('./fakedata/person.json');
    ctx.body = data;
  });
};
