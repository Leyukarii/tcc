import axios from 'axios';

const api = axios.create({
  baseURL: 'http://157.230.224.194:5001/', // Substitua pelo endereço do seu backend
});

export default api;
