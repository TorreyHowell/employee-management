import myAxios from '../../utils/axios'

const API = '/api/clients/'

const getActiveClients = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await myAxios.get(API + 'active', config)

  return response.data
}

const getClients = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.get(API, config)

  return response.data
}

const getClient = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.get(API + id, config)

  return response.data
}

const createClient = async (clientData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.post(API, clientData, config)

  return response.data
}

const changeStatus = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.post(`${API}status/${id}`, {}, config)

  return response.data
}

const clientService = {
  getActiveClients,
  getClients,
  createClient,
  getClient,
  changeStatus,
}

export default clientService
