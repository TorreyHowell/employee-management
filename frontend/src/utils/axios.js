import axios from 'axios'
import { noAuth } from '../features/auth/authSlice'
import { store } from '../app/store'

const myAxios = axios.create()

myAxios.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    if (error.response.status === 403) {
      store.dispatch(noAuth())
    }

    return Promise.reject(error)
  }
)

export default myAxios
