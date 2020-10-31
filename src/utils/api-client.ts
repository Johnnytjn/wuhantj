import axios from "axios";

const BaseURL = {
  drug: "/api/drug",
  whoring: "/api/whoring",
  fraud: "/api/fraud"
};

axios.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    const status = error.response.status;
    if (401 === status) {
      window.location.href = "/api/login";
    } else if (403 === status) {
      window.location.href = "/error/403";
    } else {
      return Promise.reject(error);
    }
  }
);

class APIClient {
  private invoke({
    url,
    method = "get",
    data = undefined
  }: {
    url: string;
    method?: "get" | "post" | "put" | "delete";
    data?: object;
    env?: string;
  }) {
    const config = {
      method,
      url
    };
    if (data) {
      config["data"] = data;
    }
    console.log("axios config:", config);

    return axios(config).then(res => res.data);
  }

  // getGraph(type, phoneNumbers: string[]) {
  //   return this.invoke({
  //     url: BaseURL[type] + "/graph",
  //     method: "post",
  //     data: { phoneNumbers }
  //   });
  // }

  getFraudInfo(phoneNumber: string) {
    return this.invoke({
      url: BaseURL["fraud"] + "/" + phoneNumber
    });
  }

  // v2
  search(type, phoneNumbers: string[]) {
    return this.invoke({
      url: BaseURL[type] + "/search",
      method: "post",
      data: { phoneNumbers }
    });
  }
  getGraph(type, phoneNumbers: string[]) {
    return this.invoke({
      url: BaseURL[type] + "/graph",
      method: "post",
      data: { phoneNumbers }
    });
  }
  getPersonData(type, phoneNumber: string) {
    return this.invoke({
      url: BaseURL[type] + "/person/" + phoneNumber
    });
  }
  getTrackData(type, phoneNumber: string) {
    return this.invoke({
      url: BaseURL[type] + "/track/" + phoneNumber
    });
  }
  getTagData(type, phoneNumber: string) {
    return this.invoke({
      url: BaseURL[type] + "/tag/" + phoneNumber
    });
  }
}

const apiClient = new APIClient();
export default apiClient;
