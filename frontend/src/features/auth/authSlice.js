import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
  user: null,
  authStatus: '',
  message: '',
}

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData)
    } catch (error) {
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData)
    } catch (error) {
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    return await authService.refresh()
  } catch (error) {
    console.log(error)
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.authStatus = ''
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.authStatus = 'LOADING'
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload
        state.authStatus = 'SUCCESS'
      })
      .addCase(register.rejected, (state, action) => {
        state.message = action.payload
        state.authStatus = 'ERROR'
      })
      .addCase(login.pending, (state) => {
        state.authStatus = 'LOADING'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.authStatus = 'SUCCESS'
      })
      .addCase(login.rejected, (state, action) => {
        state.message = action.payload
        state.authStatus = 'ERROR'
      })
      .addCase(refresh.pending, (state) => {
        state.authStatus = 'LOADING'
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload
        state.authStatus = 'SUCCESS'
      })
      .addCase(refresh.rejected, (state, action) => {
        state.message = action.payload
        state.authStatus = 'ERROR'
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
