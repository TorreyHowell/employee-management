import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import invoiceReducer from '../features/invoice/invoiceSlice'
import clientReducer from '../features/client/clientSlice'
import confirmModalReducer from '../features/modal/confirmModalSlice'
import chargesReducer from '../features/charges/chargesSlice'
import usersReducer from '../features/users/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoice: invoiceReducer,
    client: clientReducer,
    confirmModal: confirmModalReducer,
    charges: chargesReducer,
    users: usersReducer,
  },
})
