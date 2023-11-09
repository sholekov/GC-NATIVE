import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError, } from 'axios';

const BASE_URI = process.env.EXPO_PUBLIC_API_URL;

const config: AxiosRequestConfig = {
  baseURL: BASE_URI,
  timeout: 1000,
  headers: {
    Accept: 'application/json',
  },
};

// axios.defaults.baseURL = `${BASE_URI}`
const customUserAgent = "ReactNative";
axios.defaults.headers.common["User-Agent"] = customUserAgent;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const instance: AxiosInstance = axios.create(config);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Handle error
    console.log('error', error);
    return Promise.reject(error);
  }
);

export default instance;