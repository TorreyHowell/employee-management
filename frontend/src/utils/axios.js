import axios from 'axios'
import { noAuth, setToken } from '../features/auth/authSlice'
import { store } from '../app/store'

const myAxios = axios.create()

myAxios.interceptors.response.use(
  (response) => {
    if (
      response.headers['x-access-token'] &&
      response.headers['x-access-token'] !== undefined
    ) {
      store.dispatch(setToken(response.headers['x-access-token']))
    }
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
