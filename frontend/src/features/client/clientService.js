import myAxios from '../../utils/axios'

const API = '/api/clients/'

const getActiveClients = async () => {
  const response = await myAxios.get(API + 'active')

  return response.data
}

const clientService = {
  getActiveClients,
}

export default clientService
