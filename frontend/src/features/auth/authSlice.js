import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
  user: null,
  authStatus: 'REFRESHING',
  message: '',
}

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData)
    } catch (error) {
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
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await authService.logout()
  } catch (error) {
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
    setToken: (state, action) => {
      state.user.accessToken = action.payload
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
        state.authStatus = 'REFRESHING'
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload
        state.authStatus = 'SUCCESS'
      })
      .addCase(refresh.rejected, (state) => {
        state.authStatus = ''
      })
      .addCase(logout.pending, (state) => {
        state.authStatus = 'LOADING'
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null
        state.authStatus = 'LOGOUT'
      })
  },
})

export const { reset, setToken } = authSlice.actions
export default authSlice.reducer
