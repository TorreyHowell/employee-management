import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
  user: null,
  authStatus: 'REFRESHING',
  authMessage: '',
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

export const changeUserName = createAsyncThunk(
  'auth/changeUserName',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await authService.changeUserName(token, data)
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

export const changeUserEmail = createAsyncThunk(
  'auth/changeUserEmail',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await authService.changeUserEmail(token, data)
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

export const changeUserPassword = createAsyncThunk(
  'auth/changeUserPassword',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await authService.changeUserPassword(token, data)
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.authStatus = ''
      state.authMessage = ''
    },
    noAuth: (state) => {
      state.authStatus = ''
      state.user = null
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
        state.authMessage = action.payload
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
        state.authMessage = action.payload
        state.authStatus = 'ERROR'
      })
      .addCase(refresh.pending, (state) => {
        state.authStatus = 'REFRESHING'
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload
        state.authStatus = 'SUCCESS'
      })
      .addCase(refresh.rejected, (state, action) => {
        state.authStatus = 'Error'
        state.authMessage = action.payload
      })
      .addCase(logout.pending, (state) => {
        state.user = null
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null
        state.authStatus = 'LOGOUT'
      })
      .addCase(logout.rejected, (state) => {
        state.user = null
      })
      .addCase(changeUserName.pending, (state) => {})
      .addCase(changeUserName.fulfilled, (state, action) => {
        state.user.name = action.payload
        state.authStatus = 'CHANGED'
        state.authMessage = 'Name successfully changed'
      })
      .addCase(changeUserName.rejected, (state) => {})
      .addCase(changeUserEmail.pending, (state) => {})
      .addCase(changeUserEmail.fulfilled, (state, action) => {
        state.user.email = action.payload
        state.authStatus = 'CHANGED'
        state.authMessage = 'Email successfully changed'
      })
      .addCase(changeUserEmail.rejected, (state, action) => {
        state.authStatus = 'ERROR'
        state.authMessage = action.payload
      })
      .addCase(changeUserPassword.pending, (state) => {})
      .addCase(changeUserPassword.fulfilled, (state, action) => {
        state.authStatus = 'CHANGED'
        state.authMessage = 'Password successfully changed'
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.authStatus = 'ERROR'
        state.authMessage = action.payload
      })
  },
})

export const { reset, noAuth, setToken } = authSlice.actions
export default authSlice.reducer
