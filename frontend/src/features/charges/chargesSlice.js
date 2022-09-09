import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import chargesService from './chargesService'

const initialState = {
  charges: [],
  charge: {},
  bills: [],
  bill: {},
  chargesStatus: '',
  message: '',
}

export const getClientCharges = createAsyncThunk(
  'charges/getClientCharges',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await chargesService.getClientCharges(token, id)
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

export const getClientBills = createAsyncThunk(
  'charges/getClientBills',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await chargesService.getClientBills(token, id)
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

export const createBill = createAsyncThunk(
  'charges/createBill',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await chargesService.createBill(token, data)
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

export const chargesSlice = createSlice({
  name: 'charges',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClientCharges.pending, (state, action) => {
        state.chargesStatus = 'LOADING'
      })
      .addCase(getClientCharges.fulfilled, (state, action) => {
        state.charges = action.payload
        state.chargesStatus = ''
      })
      .addCase(getClientCharges.rejected, (state, action) => {
        state.chargesStatus = ''
      })
      .addCase(createBill.pending, (state, action) => {})
      .addCase(createBill.fulfilled, (state, action) => {
        console.log()
        state.bills.push(action.payload.bill)
        state.charges = state.charges.filter(
          (charge) => !action.payload.chargeIds.includes(charge._id)
        )
      })
      .addCase(createBill.rejected, (state, action) => {})
      .addCase(getClientBills.pending, (state, action) => {
        state.chargesStatus = 'LOADING'
      })
      .addCase(getClientBills.fulfilled, (state, action) => {
        state.bills = action.payload
        state.chargesStatus = ''
      })
      .addCase(getClientBills.rejected, (state, action) => {
        state.chargesStatus = ''
      })
  },
})

export const { reset, filterCharges } = chargesSlice.actions
export default chargesSlice.reducer
