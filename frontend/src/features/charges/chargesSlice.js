import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import chargesService from './chargesService'

const initialState = {
  charges: [],
  charge: null,
  bills: [],
  invoices: [],
  receipts: [],
  bill: null,
  chargesStatus: '',
  chargesMessage: '',
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

export const deleteCharge = createAsyncThunk(
  'charges/deleteCharge',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await chargesService.deleteCharge(token, id)
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

export const getBill = createAsyncThunk(
  'charges/getBill',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await chargesService.getBill(token, id)
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

export const updateBill = createAsyncThunk(
  'charges/updateBill',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await chargesService.updateBill(token, data)
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

export const deleteBill = createAsyncThunk(
  'charges/deleteBill',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await chargesService.deleteBill(token, id)
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
export const updateBillPrice = createAsyncThunk(
  'charges/updateBillPrice',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await chargesService.updateBillPrice(token, data)
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

export const createReceiptCharge = createAsyncThunk(
  'charges/createReceiptCharge',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await chargesService.createReceiptCharge(token, data)
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

export const createUserReceiptCharge = createAsyncThunk(
  'charges/createUserReceiptCharge',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await chargesService.createUserReceiptCharge(token, data)
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

// export const getUserReceipts = createAsyncThunk(
//   'charges/getUserReceipts',
//   async (_, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.accessToken
//       return await chargesService.getUserReceipts(token)
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

export const deleteUserReceipts = createAsyncThunk(
  'charges/deleteUserReceipts',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await chargesService.deleteUserReceipt(token, id)
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

export const getAccountingCharges = createAsyncThunk(
  'charges/getAccountingCharges',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await chargesService.getAccountingCharges(token)
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

export const createCustomCharge = createAsyncThunk(
  'charges/createCustomCharge',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await chargesService.createCustomCharge(token, data)
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
      .addCase(getBill.pending, (state, action) => {
        state.chargesStatus = 'LOADING'
      })
      .addCase(getBill.fulfilled, (state, action) => {
        state.bill = action.payload
        state.chargesStatus = ''
      })
      .addCase(getBill.rejected, (state, action) => {
        state.chargesStatus = ''
      })
      .addCase(updateBill.pending, (state, action) => {
        state.chargesStatus = 'LOADING'
      })
      .addCase(updateBill.fulfilled, (state, action) => {
        state.bill = action.payload
        state.chargesStatus = ''
      })
      .addCase(updateBill.rejected, (state, action) => {
        state.chargesStatus = ''
      })
      .addCase(deleteBill.pending, (state, action) => {
        state.chargesStatus = 'LOADING'
      })
      .addCase(deleteBill.fulfilled, (state, action) => {
        state.chargesStatus = 'DELETED'
      })
      .addCase(deleteBill.rejected, (state, action) => {
        state.chargesStatus = ''
      })
      .addCase(deleteCharge.pending, (state, action) => {
        state.chargesStatus = 'LOADING'
      })
      .addCase(deleteCharge.fulfilled, (state, action) => {
        state.charges = state.charges.filter(
          (charge) => charge._id !== action.payload
        )
      })
      .addCase(deleteCharge.rejected, (state, action) => {
        state.chargesStatus = ''
      })
      .addCase(createReceiptCharge.pending, (state, action) => {
        state.chargesStatus = 'PENDING'
      })
      .addCase(createReceiptCharge.fulfilled, (state, action) => {
        state.chargesStatus = 'CHARGE_CREATED'
        state.charges.push(action.payload)
      })
      .addCase(createReceiptCharge.rejected, (state, action) => {
        state.chargesStatus = 'ERROR_CHARGES'
        state.chargesMessage = action.payload
      })
      .addCase(updateBillPrice.pending, (state, action) => {
        state.chargesStatus = 'PENDING'
      })
      .addCase(updateBillPrice.fulfilled, (state, action) => {
        state.chargesStatus = 'CHARGE_CREATED'
        state.bill.amountCharged = action.payload.amountCharged
        state.bill.profit = action.payload.profit
      })
      .addCase(updateBillPrice.rejected, (state, action) => {
        state.chargesStatus = 'ERROR'
        state.chargesMessage = action.payload
      })
      .addCase(createCustomCharge.pending, (state, action) => {
        state.chargesStatus = 'PENDING'
      })
      .addCase(createCustomCharge.fulfilled, (state, action) => {
        state.chargesStatus = 'CHARGE_CREATED'
        state.charges.push(action.payload)
      })
      .addCase(createCustomCharge.rejected, (state, action) => {
        state.chargesStatus = 'ERROR_CHARGES'
        state.chargesMessage = action.payload
      })
      .addCase(getAccountingCharges.pending, (state, action) => {
        state.chargesStatus = 'LOADING'
      })
      .addCase(getAccountingCharges.fulfilled, (state, action) => {
        state.chargesStatus = 'SUCCESS'
        state.bills = action.payload.bills
        state.receipts = action.payload.receipts
        state.invoices = action.payload.invoices
      })
      .addCase(getAccountingCharges.rejected, (state, action) => {
        state.chargesStatus = ''
        state.chargesMessage = action.payload
      })
      .addCase(createUserReceiptCharge.pending, (state, action) => {
        state.chargesStatus = 'Pending'
      })
      .addCase(createUserReceiptCharge.fulfilled, (state, action) => {
        state.chargesStatus = 'SUCCESS'
        state.receipts.push(action.payload)
      })
      .addCase(createUserReceiptCharge.rejected, (state, action) => {
        state.chargesStatus = ''
        state.chargesMessage = action.payload
      })
      .addCase(deleteUserReceipts.pending, (state, action) => {
        state.chargesStatus = 'PENDING'
      })
      .addCase(deleteUserReceipts.fulfilled, (state, action) => {
        state.chargesStatus = 'SUCCESS'
        state.receipts = state.receipts.filter(
          (receipt) => receipt._id !== action.payload
        )
      })
      .addCase(deleteUserReceipts.rejected, (state, action) => {
        state.chargesStatus = 'ERROR'
        state.chargesMessage = action.payload
      })
  },
})

export const { reset, filterCharges } = chargesSlice.actions
export default chargesSlice.reducer
