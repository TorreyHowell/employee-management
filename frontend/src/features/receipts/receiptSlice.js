import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import receiptService from './receiptService'

const initialState = {
  receipts: [],
  receiptStatus: '',
  receiptMessage: '',
}

export const adminGetUserActiveReceipts = createAsyncThunk(
  'receipt/adminGetUserActiveReceipts',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await receiptService.adminGetUserActiveReceipts(token, id)
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

export const createUserReceipt = createAsyncThunk(
  'receipt/createUserReceipt',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await receiptService.createUserReceipt(token, data)
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

export const deleteUserReceipt = createAsyncThunk(
  'receipt/deleteUserReceipt',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await receiptService.deleteUserReceipt(token, id)
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

export const getUserReceipts = createAsyncThunk(
  'receipt/getUserActiveReceipts',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await receiptService.getUserActiveReceipts(token)
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

export const receiptSlice = createSlice({
  name: 'receipts',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserReceipts.pending, (state, action) => {})
      .addCase(getUserReceipts.fulfilled, (state, action) => {
        state.receipts = action.payload
      })
      .addCase(getUserReceipts.rejected, (state, action) => {})
      .addCase(createUserReceipt.pending, (state, action) => {})
      .addCase(createUserReceipt.fulfilled, (state, action) => {
        state.receipts.push(action.payload)
      })
      .addCase(createUserReceipt.rejected, (state, action) => {})
      .addCase(deleteUserReceipt.pending, (state, action) => {})
      .addCase(deleteUserReceipt.fulfilled, (state, action) => {
        state.receipts = state.receipts.filter(
          (receipt) => receipt._id !== action.payload
        )
      })
      .addCase(deleteUserReceipt.rejected, (state, action) => {})
      .addCase(adminGetUserActiveReceipts.pending, (state, action) => {})
      .addCase(adminGetUserActiveReceipts.fulfilled, (state, action) => {
        state.receipts = action.payload
      })
      .addCase(adminGetUserActiveReceipts.rejected, (state, action) => {})
  },
})

export const { reset } = receiptSlice.actions
export default receiptSlice.reducer
