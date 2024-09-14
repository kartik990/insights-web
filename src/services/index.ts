import axios from "axios";

// const BASE_URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8000';

export const BASE_URL = "http://localhost:8000/";

export const BaseQuery = axios.create({
  baseURL: BASE_URL,
});

// BaseQuery.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const { baseURL, headers } = config;
//     const { accessToken } = pickAccessToken();

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//       // if (headers['Content-type'] === undefined && headers['Content-Type'] === undefined) {
//       //   config.headers['Content-type'] = 'application/json';
//       // }
//     }
//     return assign(config, headers, { baseURL });
//   },
//   (error) => {
//     throw error.response;
//   }
// );

// BaseQuery.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     // Handle the error
//     return Promise.reject(error.response.data.error);
//   }
// );

export default BaseQuery;
