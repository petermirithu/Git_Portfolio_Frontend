import Axios from "../configurations/Interceptor";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export const add_project = (payload) => {
    return Axios.post(BACKEND_BASE_URL + "/api/add_project", payload);
}

export const get_projects = (user_id) => {
    return Axios.get(BACKEND_BASE_URL + "/api/get_projects/"+user_id);
}

export const update_project = (payload) => {
    return Axios.put(BACKEND_BASE_URL + "/api/update_project", payload);
}

export const delete_project = (project_id) => {
    return Axios.delete(BACKEND_BASE_URL + "/api/delete_project/"+project_id);
}