import axios from "axios";



const httpClient = axios.create({
   baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json"
  }
});

httpClient.interceptors.request.use(
  (config: any) => {
    config.headers = {
      "Content-Type": "application/json"
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
    }
    return Promise.reject(error);
  }
);

export default httpClient;
