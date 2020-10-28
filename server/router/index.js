const DrugRelatedPersAPI = require("../api/drugRelatedPersAPI");
const WhoringRelatedPersAPI = require("../api/whoringRelatedPersAPI");
// const FraudAPI = require("../api/fraudAPI");
//v2
const DrugAPI = require("../api/v2/drugAPI");
const WhoringAPI = require("../api/v2/whoringAPI");
const FraudAPI = require("../api/v2/fraudAPI");

const apiBaseUrl = process.env.API_BASE_URL;
if (apiBaseUrl) {
  console.log("API BASE URL: ", apiBaseUrl);
} else {
  console.error("The env var API_BASE_URL is required.");
  process.exit(1);
}

const drugRelatedPersAPI = new DrugRelatedPersAPI({ baseUrl: apiBaseUrl });
const whoringRelatedPersAPI = new WhoringRelatedPersAPI({ baseUrl: apiBaseUrl });
// const fraudAPI = new FraudAPI({ baseUrl: apiBaseUrl });

//v2
const dragAPI = new DrugAPI({ baseUrl: apiBaseUrl });
const whoringAPI = new WhoringAPI({ baseUrl: apiBaseUrl });
const fraudAPI = new FraudAPI({ baseUrl: apiBaseUrl });

module.exports = function(router) {
  router.prefix("/api");
  router.post("/drug-related-pers/graph", async ctx => {
    const { phoneNumbers } = ctx.request.body;
    ctx.body = await drugRelatedPersAPI.getRelatedPerGraph(phoneNumbers);
  });
  router.get("/drug-related-pers/:phoneNumber", async ctx => {
    const { phoneNumber } = ctx.params;
    ctx.body = await drugRelatedPersAPI.getPersonData(phoneNumber);
  });
  router.post("/whoring-related-pers/graph", async ctx => {
    const { phoneNumbers } = ctx.request.body;
    ctx.body = await whoringRelatedPersAPI.getRelatedPerGraph(phoneNumbers);
  });
  router.get("/whoring-related-pers/:phoneNumber", async ctx => {
    const { phoneNumber } = ctx.params;
    ctx.body = await whoringRelatedPersAPI.getPersonData(phoneNumber);
  });
  router.get("/fraud-info/:phoneNumber", async ctx => {
    const { phoneNumber } = ctx.params;
    ctx.body = await fraudAPI.getFraudInfo(phoneNumber);
  });

  //v2
  router.post("/drug/search", async ctx => {
    const { phoneNumbers } = ctx.request.body;
    ctx.body = await dragAPI.search(phoneNumbers);
  });
  router.post("/drug/graph", async ctx => {
    const { phoneNumbers } = ctx.request.body;
    ctx.body = await dragAPI.graph(phoneNumbers);
  });
  router.post("/whoring/search", async ctx => {
    const { phoneNumbers } = ctx.request.body;
    ctx.body = await whoringAPI.search(phoneNumbers);
  });
  router.post("/whoring/graph", async ctx => {
    const { phoneNumbers } = ctx.request.body;
    ctx.body = await whoringAPI.graph(phoneNumbers);
  });
  router.post("/fraud/search", async ctx => {
    const { phoneNumbers } = ctx.request.body;
    ctx.body = await fraudAPI.search(phoneNumbers);
  });
};
