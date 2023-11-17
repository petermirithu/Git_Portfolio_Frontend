import { createSlice } from "@reduxjs/toolkit";

export const UserProfileSlice = createSlice({
    name:"userProfile",
    initialState:{       
        profile: null,          
    },
    reducers:{                   
        setUserProfile:(state, action)=>{                   
            state.userProfile=action.payload;            
        },                                             
    }
});

export const { setUserProfile } = UserProfileSlice.actions;

export default UserProfileSlice.reducer;