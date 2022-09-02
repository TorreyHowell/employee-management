import axios from 'axios'

const URL = '/api/users/'

const register = async (userData) => {
  const response = await axios.post(URL, userData)

  return response.data
}

const login = async (userData) => {
  const response = await axios.post(URL + 'login', userData)

  return response.data
}

const refresh = async () => {
  const response = await axios.get(URL)

  return response.data
}

const authService = {
  register,
  login,
  refresh,
}

export default authService
