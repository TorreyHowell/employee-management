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

const changeUserName = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.put(URL + 'user-name', data, config)

  return response.data
}

const changeUserEmail = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.put(URL + 'user-email', data, config)

  return response.data
}

const changeUserPassword = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.put(URL + 'user-password', data, config)

  return response.data
}

const authService = {
  register,
  login,
  refresh,
  logout,
  changeUserName,
  changeUserEmail,
  changeUserPassword,
}

export default authService
