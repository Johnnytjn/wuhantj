const DrugRelatedPersAPI = require('../api/drugRelatedPersAPI');

const apiBaseUrl = process.env.API_BASE_URL;
if (apiBaseUrl) {
  console.log('API BASE URL: ', apiBaseUrl);
} else {
  console.error('The env var API_BASE_URL is required.');
  process.exit(1);
}

const drugRelatedPersAPI = new DrugRelatedPersAPI({ baseUrl: apiBaseUrl });

module.exports = function(router) {
  router.prefix('/api');
  router.post('/drug-related-pers/graph', async ctx => {
    const { phoneNumbers } = ctx.request.body;
    ctx.body = await drugRelatedPersAPI.getRelatedPerGraph(phoneNumbers);
  });
  router.get('/drug-related-pers/:phoneNumber', async ctx => {
    const { phoneNumber } = ctx.params;
    ctx.body = await drugRelatedPersAPI.getPersonData(phoneNumber);
  });
};
