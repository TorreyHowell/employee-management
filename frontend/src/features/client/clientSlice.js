import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import clientService from './clientService'

const initialState = {
  clients: [],
  client: null,
  clientStatus: '',
  clientMessage: '',
}

export const getActiveClients = createAsyncThunk(
  'client/getActiveClients',
  async (_, thunkAPI) => {
    try {
      return await clientService.getActiveClients()
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

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getActiveClients.pending, (state, action) => {})
      .addCase(getActiveClients.fulfilled, (state, action) => {
        state.clients = action.payload
      })
      .addCase(getActiveClients.rejected, (state, action) => {})
  },
})

export const { reset } = clientSlice.actions
export default clientSlice.reducer
