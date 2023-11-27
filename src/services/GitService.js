import { Octokit } from "octokit";
import axios from 'axios';

const octokit = new Octokit({
    auth: import.meta.env.GIT_PERSONAL_TOKEN
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

