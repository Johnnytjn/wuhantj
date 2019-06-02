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

  async getRelatedPerGraph(phoneNumbers) {
    let rawData;
    if (this.baseUrl) {
      const url = this.baseUrl + '/drug-related-pers/graph';
      rawData = await invoke({ url, method: 'post', data: { phone_nums: phoneNumbers } });
    } else {
      rawData = {
        relationships: {
          phone_num1: ['phone_num2', 'phone_num3', 'phone_num4'],
          phone_num4: ['phone_num5', 'phone_num6']
        },
        'person-data': {
          phone_num1: {
            name: '王二1',
            score: 56.66
          },
          phone_num2: {
            name: '王二2',
            score: 26.666
          },
          phone_num3: {
            name: '王二3',
            score: 16.666
          },
          phone_num4: {
            name: '王二4',
            score: 59.666
          },
          phone_num5: {
            name: '王二5',
            score: 25.666
          },
          phone_num6: {
            name: '王二6',
            score: 88.666
          }
        },
        'no-data': ['phone_num7', 'phone_num8']
      };
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
