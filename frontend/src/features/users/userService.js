import myAxios from '../../utils/axios'

const API = '/api/users/'

const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.get(API + 'all', config)

  return response.data
}

const getUserAdmin = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.get(`${API}admin/${id}`, config)

  return response.data
}

const updateUserAdmin = async (token, { id, query }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.put(`${API}admin/${id}`, query, config)

  return response.data
}

const userService = {
  getUsers,
  getUserAdmin,
  updateUserAdmin,
}

export default userService
