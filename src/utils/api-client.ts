import axios from 'axios';

const BaseURL = {
  drugRelatedPers: '/api/drug-related-pers'
};

axios.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    const status = error.response.status;
    if (401 === status) {
      window.location.href = '/api/login';
    } else if (403 === status) {
      window.location.href = '/error/403';
    } else {
      return Promise.reject(error);
    }
  }
);

class APIClient {
  private invoke({
    url,
    method = 'get',
    data = undefined
  }: {
    url: string;
    method?: 'get' | 'post' | 'put' | 'delete';
    data?: object;
    env?: string;
  }) {
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

  getDrugRelatedPersGraph(phoneNumbers: string[]) {
    return this.invoke({
      url: BaseURL.drugRelatedPers + '/graph',
      method: 'post',
      data: { phoneNumbers }
    });
  }

  getPersonData(phoneNumber: string) {
    return this.invoke({
      url: BaseURL.drugRelatedPers + '/' + phoneNumber
    });
  }
}

const apiClient = new APIClient();
export default apiClient;
