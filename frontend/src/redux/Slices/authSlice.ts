import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
import {type AuthState} from '../../types/authTypes'



const initialState : AuthState = {
       user : JSON.parse(localStorage.getItem("user") || "null"),
       loading : false,
       error : null,
      isRegistered: false 
};

const authSlice = createSlice ({

        name :"auth",
        initialState,
        reducers : {
            registerRequest: (state, action: PayloadAction<any>) =>{
                state.loading = true;
                state.error = null ;
                state.isRegistered = false
            },
              registerSuccess: (state, action) =>{
              state.loading = false;  
              state.isRegistered = true

            },
              registerFailure: (state, action) =>{
                state.loading = false;
                state.error = action.payload;
            },
            loginRequest: (state, action: PayloadAction<any>) =>{
                state.loading = true;
                state.error = null;
            },
              loginSuccess: (state, action) =>{
              state.loading = false;
                state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload)); 
            },
              loginFailure: (state, action) =>{
                state.loading = false;
                state.error = action.payload;
            },
            logout:(state) => {
                  state.user = null;
                  state.loading = false;
                  state.error = null;
                  localStorage.removeItem("user"); 
                  localStorage.removeItem("token")

            },
        },
});

export const {
  registerRequest, registerSuccess,registerFailure,loginRequest,
  loginSuccess,loginFailure , logout
} = authSlice.actions
export default authSlice.reducer

