import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  sendIsOpen: false,
  stagedId: '',
  type: '',
  parentId: '',
}

export const confirmModalSlice = createSlice({
  name: 'confirmModal',
  initialState,
  reducers: {
    reset: (state) => initialState,
    stage: (state, action) => {
      state.isOpen = true
      state.stagedId = action.payload?.id
      state.type = action.payload?.type
      state.parentId = action.payload?.parentId
    },
    stageSend: (state, action) => {
      state.sendIsOpen = true
      state.stagedId = action.payload?.id
      state.type = action.payload?.type
    },
  },
})

export const { reset, stage, stageSend } = confirmModalSlice.actions
export default confirmModalSlice.reducer
