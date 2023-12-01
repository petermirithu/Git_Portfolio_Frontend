import Axios from "../configurations/Interceptor";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export const validateEmail = (text) => {
    const regex1 = /^\S+@\S+\.\S+$/;
    const regex2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (regex1.test(text) === false && regex2.test(text) === false) {
        return false;
    }
    else {
        return true;
    }
}
// ********************************************* Server Requests ********************************************* 
export const sign_up_user = (payload) => {
    return Axios.post(BACKEND_BASE_URL + "/api/sign_up_user", payload);
}

export const sign_in_user = (payload) => {    
    return Axios.post(BACKEND_BASE_URL + "/api/sign_in_user", payload);
}

export const forgot_password = (payload) => {    
    return Axios.put(BACKEND_BASE_URL + "/api/forgot_password", payload);
}

export const reset_password = (payload) => {    
    return Axios.put(BACKEND_BASE_URL + "/api/reset_password", payload);
}

export const update_socials = (payload) => {    
    return Axios.put(BACKEND_BASE_URL + "/api/update_socials", payload);
}

export const get_user = (email) => {    
    return Axios.get(BACKEND_BASE_URL + "/api/get_user/"+email);
}
