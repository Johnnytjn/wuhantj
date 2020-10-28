const BaseBackendAPI = require("./BaseBackendAPI");

module.exports = class BackendAPI extends BaseBackendAPI {
  constructor(props) {
    super(props);
  }

  search(phoneNumbers) {
    const url = this.baseUrl + "/whoring/search";
    return this.invoke({ url, method: "post", data: { phoneNumbers } });
  }

  async graph(phoneNumbers) {
    let rawData;
    const url = this.baseUrl + "/whoring/graph";
    rawData = await this.invoke({ url, method: "post", data: { phone_nums: phoneNumbers } });

    const result = { "no-data": rawData["no-data"] };
    if (rawData && Object.keys(rawData["relationships"]).length > 0) {
      const graphData = { nodes: [], links: [] };

      const { relationships } = rawData;
      const personData = rawData["person-data"];
      const targetNums = Object.keys(relationships);
      Object.entries(personData).forEach(([phoneNumber, person]) => {
        const { name: personName, score: rawScore } = person;
        const score = +(+rawScore.toFixed(2));
        const dataType = targetNums.includes(phoneNumber) ? "target" : "contact";
        // const name = dataType === 'target' ? personName : `${personName} (${score} %)`;
        const name = personName;
        graphData["nodes"].push({ id: phoneNumber, name, score, dataType });
      });

      const addCategoryAttr = (phoneNumber, categoryId) => {
        const nodeIndex = graphData["nodes"].findIndex(x => x.id === phoneNumber);
        const node = graphData["nodes"][nodeIndex];
        if (node["dataType"] === "target") {
          if (!node["category"]) {
            node["category"] = categoryId;
          }
        } else {
          node["category"] = categoryId;
        }
        graphData["nodes"][nodeIndex] = node;
      };

      Object.entries(relationships).forEach(([sourceNum, contactNums], index) => {
        addCategoryAttr(sourceNum, index);
        contactNums.forEach(targetNum => {
          addCategoryAttr(targetNum, index);
          graphData["links"].push({ source: sourceNum, target: targetNum });
        });
      });

      graphData["categoryCount"] = targetNums.length;

      result["graph"] = graphData;
    }

    return result;
  }
};
