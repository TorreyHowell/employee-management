import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import hoursService from './hoursService'

const initialState = {
  hours: [],
  hoursStatus: '',
  hoursMessage: '',
}

export const createHours = createAsyncThunk(
  'hours/create',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await hoursService.createHours(token, data)
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

export const deleteHours = createAsyncThunk(
  'hours/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await hoursService.deleteHours(token, id)
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

export const getActiveHours = createAsyncThunk(
  'hours/getActiveHours',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await hoursService.getActiveHours(token)
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

export const hoursSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHours.pending, (state, action) => {})
      .addCase(createHours.fulfilled, (state, action) => {
        state.hours.push(action.payload)
      })
      .addCase(createHours.rejected, (state, action) => {})
      .addCase(getActiveHours.pending, (state, action) => {})
      .addCase(getActiveHours.fulfilled, (state, action) => {
        state.hours = action.payload
      })
      .addCase(getActiveHours.rejected, (state, action) => {})
      .addCase(deleteHours.pending, (state, action) => {
        state.hoursStatus = 'LOADING'
      })
      .addCase(deleteHours.fulfilled, (state, action) => {
        state.hours = state.hours.filter(
          (hours) => hours._id !== action.payload
        )
        state.hoursStatus = ''
      })
      .addCase(deleteHours.rejected, (state, action) => {
        state.hoursStatus = 'ERROR'
        state.hoursMessage = action.payload
      })
  },
})

export const { reset } = hoursSlice.actions
export default hoursSlice.reducer
