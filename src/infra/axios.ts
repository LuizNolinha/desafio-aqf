import axios from 'axios';

export const FSApi = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

