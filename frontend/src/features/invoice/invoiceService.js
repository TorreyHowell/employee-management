import myAxios from '../../utils/axios'

const API = '/api/invoice/'

const getActiveInvoices = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.get(API + 'unsent', config)

  return response.data
}

const addHours = async ({ hourData, invoiceId }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.put(
    `${API}hours/${invoiceId}`,
    hourData,
    config
  )

  return response.data
}

const addReceipt = async ({ receiptData, invoiceId }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.put(
    `${API}receipt/${invoiceId}`,
    receiptData,
    config
  )

  return response.data
}

const deleteHours = async ({ id, parentId }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.delete(
    `${API}/hours/${parentId}/${id}`,
    config
  )

  return response.data
}

const deleteReceipt = async ({ id, parentId }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.delete(
    `${API}/receipt/${parentId}/${id}`,
    config
  )

  return response.data
}

const createInvoice = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.post(API, config)

  return response.data
}

const deleteInvoice = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.delete(API + id, config)

  return response.data
}

const invoiceService = {
  getActiveInvoices,
  addHours,
  addReceipt,
  deleteHours,
  deleteReceipt,
  createInvoice,
  deleteInvoice,
}

export default invoiceService
