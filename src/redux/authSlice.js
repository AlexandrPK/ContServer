import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import API from '../api/axios'

const api = new API()

export const loginThunk = createAsyncThunk(
    'auth/loginThunk',      
    async (payload, thunkAPI) => {
      const response = await api.login(payload)
      const responses = await api.role(response)
      
      localStorage.setItem('userData', JSON.stringify({
        token: response.headers.access_token,
        roleID: responses.data.roleId,   
        auth: 'true',            
      }))
      return response.data 
    }
  ) 


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,  
        token: null,
        roleld: {
          id: null,
          name: null,
          description: null,
        },
        error: false,
        loading: false,
        errMessage: null,
        registerRedirect: false
    },
    reducers: {
      login: (state, action) => {
        state.isAuth = true
        state.token = action.payload.token
      },
      logout: (state) => {
        state.isAuth = false
        state.token = null
      },
      role:(state,action) =>{
        state.isAuth.roleld.id = action.payload.token
      },
      nullErrorMessage: (state) => {
        state.errMessage = null
      }
    },

    extraReducers: {
        [loginThunk.fulfilled]: (state, action) => {
          state.isAuth = true
          state.token = action.payload.token
          state.loading = false
          state.error = false
        },
        [loginThunk.pending]: (state) => {
          state.loading = true
          state.error = false
        },
        [loginThunk.rejected]: (state, action) => {
          state.loading = false
          state.error = true
          state.errMessage = action.error.name || 'Sorry, something went wrong'
        },
      }
  })
   

  export const { login, logout, role, nullErrorMessage } = authSlice.actions
  
  export default authSlice.reducer