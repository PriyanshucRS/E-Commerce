import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
import {type AuthState} from '../../types/authTypes'



const initialState : AuthState = {
       user : JSON.parse(localStorage.getItem("user") || "null"),
       loading : false,
       error : null
};

const authSlice = createSlice ({

        name :"auth",
        initialState,
        reducers : {
            regitsterRequest: (state, action: PayloadAction<any>) =>{
                state.loading = true;
                state.error = null;
            },
              regitsterSuccess: (state, action) =>{
              state.loading = false;
            },
              regitsterFailure: (state, action) =>{
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
  regitsterRequest, regitsterSuccess,regitsterFailure,loginRequest,
  loginSuccess,loginFailure , logout
} = authSlice.actions
export default authSlice.reducer

