import myAxios from '../../utils/axios'

const API = '/api/contractors/'

const createContractor = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.post(API, data, config)

  return response.data
}

const getContractors = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.get(API, config)

  return response.data
}

const getContractor = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.get(API + id, config)

  return response.data
}

const updateContractor = async (token, { query, id }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.put(API + id, query, config)

  return response.data
}

const contractorService = {
  createContractor,
  getContractors,
  getContractor,
  updateContractor,
}

export default contractorService
