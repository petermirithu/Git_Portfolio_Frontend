import axios from 'axios';
import promise from 'promise';

let Axios = axios.create();

const getAuthToken = async () => {    
    const cachedData = localStorage.getItem('auth_token');
    if (cachedData == "null" || cachedData == "undefined" || cachedData == null || cachedData == undefined) {
        return null
    }
    return cachedData
}

Axios.interceptors.request.use(async (config) => {
    let accessToken = null;
    await getAuthToken().then(token => {
        accessToken = token;
    })

    if (accessToken) {
        if (config.method !== 'OPTIONS') {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
    }
    return config;
}, (error) => {
    return promise.reject(error);
});

const signOut = async () => {
    localStorage.clear()     
}

Axios.interceptors.response.use(
    (response) => {
        if (response?.status === 401 || response?.status === 403) {
            signOut();
            return Promise.reject("User not authorized or authenticated");
        }
        return response;
    },
    (error) => {
        if (error?.response?.status === 401 || error?.response?.status === 403) {
            signOut();
            return Promise.reject("User not authorized or authenticated");
        }
        return Promise.reject(error);
    }
);

export default Axios;