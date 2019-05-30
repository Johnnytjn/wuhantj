const BackendAPI = require('../api/backend');

const backendAPI = ctx => {
  return new BackendAPI(envConfig);
};

module.exports = function(router) {
  router.prefix('/api');
  router.get('/currentUser', ctx => {
    ctx.body = ctx.state.user.id;
  });
};
