import axios from 'axios'
import { setToken } from '../features/auth/authSlice'
import { store } from '../app/store'

const myAxios = axios.create()

myAxios.interceptors.response.use(
  (response) => {
    if (response.headers['x-access-token']) {
      store.dispatch(setToken(response.headers['x-access-token']))
    }

    return response
  },
  async function (error) {
    return Promise.reject(error)
  }
)

export default myAxios
