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

    return axios(config)
      .then(res => res.data)
      .catch(err => {
        console.log('Error: ', err);
      });
  }

  getPersonData(phoneNumber) {
    const url = this.baseUrl + '/whoring-related-pers/' + phoneNumber;
    return this.invoke({ url });
  }

  async getRelatedPerGraph(phoneNumbers) {
    let rawData;
    const url = this.baseUrl + '/whoring-related-pers/graph';
    rawData = await this.invoke({ url, method: 'post', data: { phone_nums: phoneNumbers } });

    const result = { 'no-data': rawData['no-data'] };
    if (rawData && Object.keys(rawData['relationships']).length > 0) {
      const graphData = { nodes: [], links: [] };

      const { relationships } = rawData;
      const personData = rawData['person-data'];
      const targetNums = Object.keys(relationships);
      Object.entries(personData).forEach(([phoneNumber, person]) => {
        const { name: personName, score: rawScore, type } = person;
        const dataType = targetNums.includes(phoneNumber) ? 'target' : 'contact';
        const name = personName;
        const nodeData = { id: phoneNumber, name, dataType, type };
        if (type === 'person') {
          nodeData['score'] = +(+rawScore.toFixed(2));
        } else {
          nodeData['category'] = 0;
        }
        graphData['nodes'].push(nodeData);
      });

      const addCategoryAttr = (phoneNumber, categoryId, nodeType) => {
        const nodeIndex = graphData['nodes'].findIndex(x => x.id === phoneNumber);
        const node = graphData['nodes'][nodeIndex];
        if (node['dataType'] === 'target') {
          if (nodeType === 'source') {
            node['category'] = categoryId;
          } else {
            if (!node['category']) {
              node['category'] = categoryId;
            }
          }
        } else {
          if (node['type'] !== 'cosmetic') {
            node['category'] = categoryId;
          }
        }
        graphData['nodes'][nodeIndex] = node;
      };

      Object.entries(relationships).forEach(([sourceNum, contactNums], index) => {
        const categoryId = index + 1;
        addCategoryAttr(sourceNum, categoryId, 'source');
        contactNums.forEach(targetNum => {
          addCategoryAttr(targetNum, categoryId, 'target');
          graphData['links'].push({ source: sourceNum, target: targetNum });
        });
      });

      graphData['categoryCount'] = targetNums.length + 1;

      result['graph'] = graphData;
    }

    return result;
  }
};
