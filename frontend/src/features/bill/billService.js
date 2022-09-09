import myAxios from '../../utils/axios'

const API = '/api/bills/'

const createBill = async (token, { clientId, charges }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.post(
    API + clientId,
    { charges: charges },
    config
  )

  return response.data
}

const billService = {
  createBill,
}

export default billService
