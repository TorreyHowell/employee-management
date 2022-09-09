import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import billService from './billService'
import { store } from '../../app/store'
import { filterCharges } from '../charges/chargesSlice'

const initialState = {
  chargesStatus: '',
  message: '',
}

export const createBill = createAsyncThunk(
  'bill/createBill',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await billService.createBill(token, data)
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

export const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBill.pending, (state, action) => {})
      .addCase(createBill.fulfilled, (state, action) => {
        state.bills.unshift(action.payload.bill)

        store.dispatch(filterCharges(action.payload.chargeIds))
      })
      .addCase(createBill.rejected, (state, action) => {})
  },
})

export const { reset } = billSlice.actions
export default billSlice.reducer
