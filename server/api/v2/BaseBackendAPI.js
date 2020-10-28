const axios = require("axios");

class BaseBackendAPI {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  invoke({ url, method = "get", data = undefined }) {
    const config = {
      method,
      url
    };
    if (data) {
      config["data"] = data;
    }
    console.log("axios config:", config);

    return axios(config)
      .then(res => res.data)
      .catch(err => {
        console.log("Error: ", err);
      });
  }
}

module.exports = BaseBackendAPI;
