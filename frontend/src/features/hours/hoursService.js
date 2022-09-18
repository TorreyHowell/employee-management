import myAxios from '../../utils/axios'

const API = '/api/hours/'

const getActiveHours = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.get(API + 'active', config)

  return response.data
}

const deleteHours = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.delete(API + id, config)

  return response.data
}

const createHours = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.post(API, data, config)

  return response.data
}

const hoursService = {
  createHours,
  getActiveHours,
  deleteHours,
}

export default hoursService
