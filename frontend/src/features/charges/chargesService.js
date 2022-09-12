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

const getBill = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.get(
    BILL_API + id,

    config
  )

  return response.data
}

const updateBill = async (token, { id, query }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.put(`${BILL_API}${id}`, query, config)

  return response.data
}

const deleteBill = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.delete(`${BILL_API}${id}`, config)

  return response.data
}

const deleteCharge = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.delete(`${API}${id}`, config)

  return response.data
}

const createReceiptCharge = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.post(`${API}receipt`, data, config)

  return response.data
}

const createCustomCharge = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.post(`${API}custom`, data, config)

  return response.data
}

const updateBillPrice = async (token, { query, id }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.put(`${BILL_API}price/${id}`, query, config)

  return response.data
}

const chargesService = {
  getClientCharges,
  createBill,
  getClientBills,
  getBill,
  updateBill,
  deleteBill,
  deleteCharge,
  createReceiptCharge,
  updateBillPrice,
  createCustomCharge,
}

export default chargesService
