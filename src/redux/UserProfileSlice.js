import { createSlice } from "@reduxjs/toolkit";

export const UserProfileSlice = createSlice({
    name:"userProfile",
    initialState:{       
        profile: null,  
        gitProfile: null,        
    },
    reducers:{                   
        setUserProfile:(state, action)=>{                   
            state.profile=action.payload;            
        },   
        setGitProfile:(state, action)=>{                   
            state.gitProfile=action.payload;            
        },                                           
    }
});

export const { setUserProfile, setGitProfile} = UserProfileSlice.actions;

export default UserProfileSlice.reducer;