import axios from "axios";


export const axiosApi = axios.create({
    baseURL: 'https://api.futurefocusadvisor.in/api',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
  });