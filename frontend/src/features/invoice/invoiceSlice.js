import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import invoiceService from './invoiceService'

const initialState = {
  invoices: [],
  invoice: null,
  invoiceStatus: '',
  invoiceMessage: '',
}

export const getActiveInvoices = createAsyncThunk(
  'invoice/getActiveInvoices',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await invoiceService.getActiveInvoices(token)
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

export const createInvoice = createAsyncThunk(
  'invoice/createInvoice',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await invoiceService.createInvoice(token)
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

export const addHours = createAsyncThunk(
  'invoice/addHours',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await invoiceService.addHours(data, token)
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

export const addReceipt = createAsyncThunk(
  'invoice/addReceipt',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await invoiceService.addReceipt(data, token)
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
  'invoice/deleteHours',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await invoiceService.deleteHours(data, token)
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

export const deleteReceipt = createAsyncThunk(
  'invoice/deleteReceipt',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await invoiceService.deleteReceipt(data, token)
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

export const deleteInvoice = createAsyncThunk(
  'invoice/deleteInvoice',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await invoiceService.deleteInvoice(id, token)
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

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getActiveInvoices.pending, (state, action) => {
        state.invoiceMessage = 'LOADING'
      })
      .addCase(getActiveInvoices.fulfilled, (state, action) => {
        state.invoiceMessage = 'SUCCESS'
        state.invoices = action.payload
      })
      .addCase(getActiveInvoices.rejected, (state, action) => {
        state.invoiceStatus = 'ERROR'
        state.invoiceMessage = action.payload
      })
      .addCase(addHours.pending, (state, action) => {
        state.invoiceMessage = 'PENDING'
      })
      .addCase(addHours.fulfilled, (state, action) => {
        state.invoiceMessage = 'SUCCESS'
        state.invoices.forEach((invoice) => {
          if (invoice._id === action.payload._id) {
            invoice.hours = action.payload.hours
            invoice.amountBilled = action.payload.amountBilled
          }
        })
      })
      .addCase(addHours.rejected, (state, action) => {
        state.invoiceMessage = 'ERROR'
        state.invoiceMessage = action.payload
      })
      .addCase(addReceipt.pending, (state, action) => {
        state.invoiceMessage = 'PENDING'
      })
      .addCase(addReceipt.fulfilled, (state, action) => {
        state.invoiceMessage = 'SUCCESS'
        state.invoices.forEach((invoice) => {
          if (invoice._id === action.payload._id) {
            invoice.receipts = action.payload.receipts
            invoice.amountBilled = action.payload.amountBilled
          }
        })
      })
      .addCase(addReceipt.rejected, (state, action) => {
        state.invoiceMessage = 'ERROR'
        state.invoiceMessage = action.payload
      })
      .addCase(deleteHours.pending, (state, action) => {
        state.invoiceMessage = 'PENDING'
      })
      .addCase(deleteHours.fulfilled, (state, action) => {
        state.invoiceMessage = 'SUCCESS'
        state.invoices.forEach((invoice) => {
          if (invoice._id === action.payload._id) {
            invoice.hours = action.payload.hours
            invoice.amountBilled = action.payload.amountBilled
          }
        })
      })
      .addCase(deleteHours.rejected, (state, action) => {
        state.invoiceMessage = 'ERROR'
        state.invoiceMessage = action.payload
      })
      .addCase(deleteReceipt.pending, (state, action) => {
        state.invoiceMessage = 'PENDING'
      })
      .addCase(deleteReceipt.fulfilled, (state, action) => {
        state.invoiceMessage = 'SUCCESS'
        state.invoices.forEach((invoice) => {
          if (invoice._id === action.payload._id) {
            invoice.receipts = action.payload.receipts
            invoice.amountBilled = action.payload.amountBilled
          }
        })
      })
      .addCase(deleteReceipt.rejected, (state, action) => {
        state.invoiceMessage = 'ERROR'
        state.invoiceMessage = action.payload
      })
      .addCase(createInvoice.pending, (state, action) => {
        state.invoiceMessage = 'PENDING'
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.invoiceMessage = 'SUCCESS'
        state.invoices.push(action.payload)
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.invoiceMessage = 'ERROR'
        state.invoiceMessage = action.payload
      })
      .addCase(deleteInvoice.pending, (state, action) => {
        state.invoiceMessage = 'PENDING'
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.invoiceMessage = 'SUCCESS'
        state.invoices = state.invoices.filter(
          (invoice) => invoice._id !== action.payload
        )
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.invoiceMessage = 'ERROR'
        state.invoiceMessage = action.payload
      })
  },
})

export const { reset } = invoiceSlice.actions
export default invoiceSlice.reducer
