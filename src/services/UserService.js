import Axios from "../configurations/Interceptor";
import { BACKEND_BASE_URL } from "./GlobalService";

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