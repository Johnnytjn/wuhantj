const BaseBackendAPI = require("./BaseBackendAPI");

module.exports = class BackendAPI extends BaseBackendAPI {
  constructor(props) {
    super(props);
  }

  search(phoneNumbers) {
    const url = this.baseUrl + "/fraud/search";
    return this.invoke({ url, method: "post", data: { phoneNumbers } });
  }
};
