import axios from 'axios';

// 实例化一个请求器，做一些基本配置
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8080",
});

// 请求拦截
axiosInstance.interceptors.request.use(
  (config) => {
    // console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// 响应拦截
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

export default axiosInstance;