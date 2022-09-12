import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import contractorService from './contractorService'

const initialState = {
  contractors: [],
  contractor: null,
  contractorStatus: '',
  contractorMessage: '',
}

export const createContractor = createAsyncThunk(
  'contractors/createContractor',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await contractorService.createContractor(token, data)
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

export const getContractors = createAsyncThunk(
  'contractors/getContractors',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await contractorService.getContractors(token)
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

export const getContractor = createAsyncThunk(
  'contractors/getContractor',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await contractorService.getContractor(token, id)
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

export const updateContractor = createAsyncThunk(
  'contractors/updateContractor',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await contractorService.updateContractor(token, data)
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

export const contractorSlice = createSlice({
  name: 'contractor',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContractor.pending, (state, action) => {})
      .addCase(createContractor.fulfilled, (state, action) => {
        state.contractors.push(action.payload)
      })
      .addCase(createContractor.rejected, (state, action) => {})
      .addCase(getContractors.pending, (state, action) => {
        state.contractorStatus = 'LOADING'
      })
      .addCase(getContractors.fulfilled, (state, action) => {
        state.contractors = action.payload
        state.contractorStatus = ''
      })
      .addCase(getContractors.rejected, (state, action) => {
        state.contractorStatus = ''
      })
      .addCase(getContractor.pending, (state, action) => {
        state.contractorStatus = 'LOADING'
      })
      .addCase(getContractor.fulfilled, (state, action) => {
        state.contractor = action.payload
        state.contractorStatus = ''
      })
      .addCase(getContractor.rejected, (state, action) => {
        state.contractorStatus = ''
      })
      .addCase(updateContractor.pending, (state, action) => {
        state.contractorStatus = 'PENDING'
      })
      .addCase(updateContractor.fulfilled, (state, action) => {
        state.contractor = action.payload
        state.contractorStatus = ''
      })
      .addCase(updateContractor.rejected, (state, action) => {
        state.contractorStatus = ''
      })
  },
})

export const { reset } = contractorSlice.actions
export default contractorSlice.reducer
