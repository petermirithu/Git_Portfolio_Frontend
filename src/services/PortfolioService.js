import Axios from "../configurations/Interceptor";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

// Projects
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

// Experiences
export const add_experience = (payload) => {
    return Axios.post(BACKEND_BASE_URL + "/api/add_experience", payload);
}

export const get_experiences = (user_id) => {
    return Axios.get(BACKEND_BASE_URL + "/api/get_experiences/"+user_id);
}

export const update_experience = (payload) => {
    return Axios.put(BACKEND_BASE_URL + "/api/update_experience", payload);
}

export const delete_experience = (project_id) => {
    return Axios.delete(BACKEND_BASE_URL + "/api/delete_experience/"+project_id);
}

// Skills
export const add_skill = (payload) => {
    return Axios.post(BACKEND_BASE_URL + "/api/add_skill", payload);
}

export const get_skills = (user_id) => {
    return Axios.get(BACKEND_BASE_URL + "/api/get_skills/"+user_id);
}

export const update_skill = (payload) => {
    return Axios.put(BACKEND_BASE_URL + "/api/update_skill", payload);
}

export const delete_skill = (skill_id) => {
    return Axios.delete(BACKEND_BASE_URL + "/api/delete_skill/"+skill_id);
}