import axios from 'axios';
import { ENVIROMENT } from '../config/api_enviorment';

const api = axios.create({
  baseURL: ENVIROMENT.API_URL,
  headers: {
    Accept: 'application/json',
  },
});

export default api;
