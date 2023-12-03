import { createSlice } from "@reduxjs/toolkit";
import theme from "../Components/theme";

export const UserProfileSlice = createSlice({
    name:"userProfile",
    initialState:{       
        profile: null,  
        gitProfile: null,  
        selectedTheme: theme.lightTheme      
    },
    reducers:{                   
        setUserProfile:(state, action)=>{                   
            state.profile=action.payload;            
        },   
        setGitProfile:(state, action)=>{                   
            state.gitProfile=action.payload;            
        },   
        setSelectedTheme:(state, action)=>{                   
            state.selectedTheme=action.payload;            
        },                                           
    }
});

export const { setUserProfile, setGitProfile, setSelectedTheme} = UserProfileSlice.actions;

export default UserProfileSlice.reducer;