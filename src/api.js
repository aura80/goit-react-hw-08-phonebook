import axios from 'axios';
import { store } from './redux/store';

const instance = axios.create({
  baseURL: 'https://connections-api.goit.global',
});

// interceptor to include JWT token at every request
instance.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.token;

    console.log("State: ", state);
    console.log("Token: ", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => Promise.reject(error));

export default instance;
