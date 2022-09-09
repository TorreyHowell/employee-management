import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  users: [],
  user: null,
  userStatus: '',
  userMessage: '',
}

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await userService.getUsers(token)
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

export const getUserAdmin = createAsyncThunk(
  'users/getUserAdmin',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await userService.getUserAdmin(token, data)
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

export const updateUserAdmin = createAsyncThunk(
  'users/updateUserAdmin',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await userService.updateUserAdmin(token, id)
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

export const userSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {})
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(getUsers.rejected, (state, action) => {})
      .addCase(getUserAdmin.pending, (state, action) => {})
      .addCase(getUserAdmin.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(getUserAdmin.rejected, (state, action) => {})
      .addCase(updateUserAdmin.pending, (state, action) => {})
      .addCase(updateUserAdmin.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(updateUserAdmin.rejected, (state, action) => {})
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer
