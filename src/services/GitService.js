import { Octokit } from "octokit";
import axios from 'axios';

const GIT_PERSONAL_TOKEN = import.meta.env.VITE_GIT_PERSONAL_TOKEN

const octokit = new Octokit({
    auth: GIT_PERSONAL_TOKEN
});


export const check_git_hub_user = async (email) => {        
    return await octokit.request(`GET /search/users?q=${email}`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })    
}

export const fetch_git_hub_user_profile = async (username) => {        
  return await octokit.request(`GET /users/${username}`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })    
}

export const fetch_git_hub_user_feed = async (username) => {  
  return axios.get(`https://api.github.com/users/${username}/events`, {headers: {
    'Authorization': `Bearer ${GIT_PERSONAL_TOKEN}`
  }});   
}