import myAxios from '../../utils/axios'

const API = '/api/receipts/'

const adminGetUserActiveReceipts = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.get(`${API}admin/user/${id}`, config)

  return response.data
}

const getUserActiveReceipts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.get(`${API}user/`, config)

  return response.data
}

const createUserReceipt = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.post(`${API}user/`, data, config)

  return response.data
}

const deleteUserReceipt = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.delete(`${API}${id}`, config)

  return response.data
}

const hoursService = {
  adminGetUserActiveReceipts,
  createUserReceipt,
  getUserActiveReceipts,
  deleteUserReceipt,
}

export default hoursService
