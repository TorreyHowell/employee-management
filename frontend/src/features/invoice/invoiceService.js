import myAxios from '../../utils/axios'

const API = '/api/invoice/'

const getUserInvoices = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.get(API + 'user', config)

  return response.data
}

const getActiveInvoices = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.get(`/api/invoice/unsent/`, config)

  return response.data
}

const getPaidInvoices = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.get(`/api/invoice/paid`, config)

  return response.data
}

const createInvoice = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.post(API, {}, config)

  return response.data
}

const getSentInvoices = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.get(API + 'sent', config)

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

const deleteInvoice = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.delete(API + id, config)

  return response.data
}

const adminDeleteInvoice = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.delete(API + 'admin/' + id, config)

  return response.data
}

const sendInvoice = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.put(`${API}send/${id}`, {}, config)

  return response.data
}

const payInvoice = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.put(`${API}pay/${id}`, {}, config)

  return response.data
}

const denyInvoice = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.put(`${API}deny/${id}`, {}, config)

  return response.data
}

const rescindInvoice = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await myAxios.put(`${API}rescind/${id}`, {}, config)

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
  sendInvoice,
  getSentInvoices,
  payInvoice,
  denyInvoice,
  getUserInvoices,
  rescindInvoice,
  getPaidInvoices,
  adminDeleteInvoice,
}

export default invoiceService
