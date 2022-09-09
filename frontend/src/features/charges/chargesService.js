import myAxios from '../../utils/axios'

const API = '/api/charges/'

const BILL_API = '/api/bills/'

const getClientCharges = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.get(API + id, config)

  return response.data
}

const getClientBills = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.get(`${BILL_API}client/${id}`, config)

  return response.data
}

const createBill = async (token, { clientId, charges }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.post(
    BILL_API + clientId,
    { charges: charges },
    config
  )

  return response.data
}

const chargesService = {
  getClientCharges,
  createBill,
  getClientBills,
}

export default chargesService
