import myAxios from '../../utils/axios'
import axios from 'axios'

const URL = '/api/users/'

const register = async (userData) => {
  const response = await myAxios.post(URL, userData)

  return response.data
}

const login = async (userData) => {
  const response = await myAxios.post(URL + 'login', userData)

  return response.data
}

const refresh = async () => {
  const response = await axios.get(URL)

  return response.data
}

const logout = async () => {
  const response = await myAxios.delete(URL + 'logout')

  return response.data
}

const authService = {
  register,
  login,
  refresh,
  logout,
}

export default authService
