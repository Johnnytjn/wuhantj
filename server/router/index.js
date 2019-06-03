const DrugRelatedPersAPI = require('../api/drugRelatedPersAPI');

const drugRelatedPersAPI = ctx => {
  return new DrugRelatedPersAPI({ baseUrl: process.env.API_BASE_URL });
};

module.exports = function(router) {
  router.prefix('/api');
  router.post('/drug-related-pers/graph', async ctx => {
    const { phoneNumbers } = ctx.request.body;
    ctx.body = await drugRelatedPersAPI(ctx).getRelatedPerGraph(phoneNumbers);
  });
  router.get('/drug-related-pers/:phoneNumber', async ctx => {
    const { phoneNumber } = ctx.params;
    ctx.body = await drugRelatedPersAPI(ctx).getPersonData(phoneNumber);
  });
};
