const axios = require('axios');

module.exports = class BackendAPI {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  invoke({ url, method = 'get', data = undefined }) {
    const config = {
      method,
      url
    };
    if (data) {
      config['data'] = data;
    }
    console.log('axios config:', config);

    return axios(config).then(res => res.data);
  }

  async getPerData(phoneNumber) {
    let rawData;
    if (this.baseUrl) {
      const url = this.baseUrl + '/drug-related-pers/' + phoneNumber;
      rawData = await invoke({ url, method: 'get' });
    } else {
      rawData = require('./fakedata/person.json');
    }
    return rawData;
  }

  async getRelatedPerGraph(phoneNumbers) {
    let rawData;
    if (this.baseUrl) {
      const url = this.baseUrl + '/drug-related-pers/graph';
      rawData = await invoke({ url, method: 'post', data: { phone_nums: phoneNumbers } });
    } else {
      rawData = require('./fakedata/graph.json');
    }

    const result = { 'no-data': rawData['no-data'] };
    if (rawData && Object.keys(rawData['relationships']).length > 0) {
      const graphData = { nodes: [], links: [] };

      const { relationships } = rawData;
      const personData = rawData['person-data'];
      const targetNums = Object.keys(relationships);
      Object.entries(personData).forEach(([phoneNumber, person]) => {
        const { name: personName, score: rawScore } = person;
        const score = +(+rawScore.toFixed(2));
        const type = targetNums.includes(phoneNumber) ? 'target' : 'contact';
        // const name = type === 'target' ? personName : `${personName} (${score} %)`;
        const name = personName;
        graphData['nodes'].push({ id: phoneNumber, name, score, type });
      });

      const addCategoryAttr = (phoneNumber, categoryId) => {
        const nodeIndex = graphData['nodes'].findIndex(x => x.id === phoneNumber);
        const node = graphData['nodes'][nodeIndex];
        if (node['type'] === 'target') {
          if (!node['category']) {
            node['category'] = categoryId;
          }
        } else {
          node['category'] = categoryId;
        }
        graphData['nodes'][nodeIndex] = node;
      };

      Object.entries(relationships).forEach(([sourceNum, contactNums], index) => {
        addCategoryAttr(sourceNum, index);
        contactNums.forEach(targetNum => {
          addCategoryAttr(targetNum, index);
          graphData['links'].push({ source: sourceNum, target: targetNum });
        });
      });

      graphData['categoryCount'] = targetNums.length;

      result['graph'] = graphData;
    }

    return result;
  }
};
