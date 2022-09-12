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

const contractorService = {
  createContractor,
  getContractors,
}

export default contractorService
