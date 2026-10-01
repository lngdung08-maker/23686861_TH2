import axios from 'axios';

import {MSSV} from '@constants/student';

export const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  config.headers['X-Student-Id'] = MSSV;
  return config;
});