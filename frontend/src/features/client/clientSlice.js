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
      const token = thunkAPI.getState().auth.user.accessToken
      return await clientService.getActiveClients(token)
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

export const getClients = createAsyncThunk(
  'client/getClients',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await clientService.getClients(token)
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

export const getClient = createAsyncThunk(
  'client/getClient',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await clientService.getClient(token, id)
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

export const changeStatus = createAsyncThunk(
  'client/changeStatus',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await clientService.changeStatus(token, id)
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

export const createClient = createAsyncThunk(
  'client/createClient',
  async (clientData, thunkAPI) => {
    try {
      console.log(clientData)
      const token = thunkAPI.getState().auth.user.accessToken
      return await clientService.createClient(clientData, token)
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
      .addCase(getClients.pending, (state, action) => {
        state.clientStatus = 'LOADING'
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.clients = action.payload
        state.clientStatus = ''
      })
      .addCase(getClients.rejected, (state, action) => {
        state.clientStatus = ''
      })
      .addCase(createClient.pending, (state, action) => {
        state.clientStatus = 'PENDING'
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.clients.unshift(action.payload)
        state.clientStatus = ''
      })
      .addCase(createClient.rejected, (state, action) => {
        state.clientStatus = ''
      })
      .addCase(getClient.pending, (state, action) => {
        state.clientStatus = 'LOADING'
      })
      .addCase(getClient.fulfilled, (state, action) => {
        state.client = action.payload
        state.clientStatus = ''
      })
      .addCase(getClient.rejected, (state, action) => {
        state.clientStatus = ''
      })
      .addCase(changeStatus.pending, (state, action) => {
        state.clientStatus = 'PENDING'
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.client.active = action.payload.status
        state.clientStatus = ''
      })
      .addCase(changeStatus.rejected, (state, action) => {
        state.clientStatus = ''
      })
  },
})

export const { reset } = clientSlice.actions
export default clientSlice.reducer
