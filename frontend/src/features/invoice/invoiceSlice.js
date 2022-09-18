import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import invoiceService from './invoiceService'

const initialState = {
  invoices: [],
  invoice: null,
  invoiceStatus: '',
  invoiceMessage: '',
}

export const getUserInvoices = createAsyncThunk(
  'invoice/getUserInvoices',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await invoiceService.getUserInvoices(token)
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

export const getSentInvoices = createAsyncThunk(
  'invoice/getSentInvoices',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await invoiceService.getSentInvoices(token)
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

export const getPaidInvoices = createAsyncThunk(
  'invoice/getPaidInvoices',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await invoiceService.getPaidInvoices(token)
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
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await invoiceService.createInvoice(token, data)
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

// export const deleteHours = createAsyncThunk(
//   'invoice/deleteHours',
//   async (data, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.accessToken
//       return await invoiceService.deleteHours(data, token)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()

//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

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

export const adminDeleteInvoice = createAsyncThunk(
  'invoice/adminDeleteInvoice',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await invoiceService.adminDeleteInvoice(id, token)
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

export const denyInvoice = createAsyncThunk(
  'invoice/denyInvoice',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await invoiceService.denyInvoice(id, token)
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

export const payInvoice = createAsyncThunk(
  'invoice/payInvoice',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await invoiceService.payInvoice(id, token)
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

export const rescindInvoice = createAsyncThunk(
  'invoice/rescindInvoice',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await invoiceService.rescindInvoice(id, token)
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

export const sendInvoice = createAsyncThunk(
  'invoice/sendInvoice',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await invoiceService.sendInvoice(id, token)
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
      .addCase(getPaidInvoices.pending, (state, action) => {
        state.invoiceMessage = 'LOADING'
      })
      .addCase(getPaidInvoices.fulfilled, (state, action) => {
        state.invoiceMessage = 'SUCCESS'
        state.invoices = action.payload
      })
      .addCase(getPaidInvoices.rejected, (state, action) => {
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
      // .addCase(deleteHours.pending, (state, action) => {
      //   state.invoiceMessage = 'PENDING'
      // })
      // .addCase(deleteHours.fulfilled, (state, action) => {
      //   state.invoiceMessage = 'SUCCESS'
      //   state.invoices.forEach((invoice) => {
      //     if (invoice._id === action.payload._id) {
      //       invoice.hours = action.payload.hours
      //       invoice.amountBilled = action.payload.amountBilled
      //     }
      //   })
      // })
      // .addCase(deleteHours.rejected, (state, action) => {
      //   state.invoiceMessage = 'ERROR'
      //   state.invoiceMessage = action.payload
      // })
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
        state.invoiceStatus = 'PENDING'
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.invoiceStatus = 'SUCCESS'
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.invoiceStatus = 'ERROR'
        state.invoiceMessage = action.payload
      })
      .addCase(deleteInvoice.pending, (state, action) => {
        state.invoiceStatus = 'PENDING'
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
      .addCase(adminDeleteInvoice.pending, (state, action) => {
        state.invoiceStatus = 'PENDING'
      })
      .addCase(adminDeleteInvoice.fulfilled, (state, action) => {
        state.invoiceMessage = 'SUCCESS'
        state.invoices = state.invoices.filter(
          (invoice) => invoice._id !== action.payload
        )
      })
      .addCase(adminDeleteInvoice.rejected, (state, action) => {
        state.invoiceStatus = 'ERROR'
        state.invoiceMessage = action.payload
      })
      .addCase(sendInvoice.pending, (state, action) => {
        state.invoiceMessage = 'PENDING'
      })
      .addCase(sendInvoice.fulfilled, (state, action) => {
        state.invoiceMessage = 'SUCCESS'
        state.invoices = state.invoices.map((invoice) => {
          if (invoice._id === action.payload) {
            invoice.sent = true
          }
          return invoice
        })
      })
      .addCase(sendInvoice.rejected, (state, action) => {
        state.invoiceMessage = 'ERROR'
        state.invoiceMessage = action.payload
      })
      .addCase(getSentInvoices.pending, (state, action) => {
        state.invoiceMessage = 'LOADING'
      })
      .addCase(getSentInvoices.fulfilled, (state, action) => {
        state.invoiceMessage = 'SUCCESS'
        state.invoices = action.payload
      })
      .addCase(getSentInvoices.rejected, (state, action) => {
        state.invoiceMessage = 'ERROR'
        state.invoiceMessage = action.payload
      })
      .addCase(denyInvoice.pending, (state, action) => {
        state.invoiceMessage = 'PENDING'
      })
      .addCase(denyInvoice.fulfilled, (state, action) => {
        state.invoiceMessage = 'SUCCESS'
        state.invoices = state.invoices.filter(
          (invoice) => invoice._id !== action.payload
        )
      })
      .addCase(denyInvoice.rejected, (state, action) => {
        state.invoiceMessage = 'ERROR'
        state.invoiceMessage = action.payload
      })
      .addCase(payInvoice.pending, (state, action) => {
        state.invoiceMessage = 'PENDING'
      })
      .addCase(payInvoice.fulfilled, (state, action) => {
        state.invoiceMessage = 'SUCCESS'
        state.invoices = state.invoices.filter(
          (invoice) => invoice._id !== action.payload
        )
      })
      .addCase(payInvoice.rejected, (state, action) => {
        state.invoiceMessage = 'ERROR'
        state.invoiceMessage = action.payload
      })
      .addCase(getUserInvoices.pending, (state, action) => {
        state.invoiceMessage = 'LOADING'
      })
      .addCase(getUserInvoices.fulfilled, (state, action) => {
        state.invoiceMessage = 'SUCCESS'
        state.invoices = action.payload
      })
      .addCase(getUserInvoices.rejected, (state, action) => {
        state.invoiceStatus = 'ERROR'
        state.invoiceMessage = action.payload
      })
      .addCase(rescindInvoice.pending, (state, action) => {
        state.invoiceMessage = 'PENDING'
      })
      .addCase(rescindInvoice.fulfilled, (state, action) => {
        state.invoiceMessage = 'SUCCESS'
        state.invoices = state.invoices.map((invoice) => {
          if (invoice._id === action.payload) {
            invoice.sent = false
          }

          return invoice
        })
      })
      .addCase(rescindInvoice.rejected, (state, action) => {
        state.invoiceMessage = 'ERROR'
        state.invoiceMessage = action.payload
      })
  },
})

export const { reset } = invoiceSlice.actions
export default invoiceSlice.reducer
