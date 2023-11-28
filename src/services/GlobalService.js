import Store from "../redux/Store";
import { setUserProfile } from "../redux/UserProfileSlice";

export const checkIfLoggedIn = () => {
    return new Promise((resolve, reject) => {
        const cachedData = localStorage.getItem('user_profile');
        if (cachedData?.length > 0) {
            const profile = JSON.parse(cachedData);
            Store.dispatch(setUserProfile(profile));
            resolve(true);            
        }
        else{
            resolve(false);            
        }
    })
}

export const checkIfEmail = () => {
    return new Promise((resolve, reject) => {
        const email = localStorage.getItem('email');
        if (email?.length > 0) {            
            resolve(email);            
        }
        else{
            resolve(null);
        }
    })
}