import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getAllProperties() {
    return apiClient.post('/property/all')
  },
  getFilteredProperties(searchParams) {
    return apiClient.post('/property/filter', searchParams)
  },
  getDistanceProperties(route) {
    return apiClient.post('/property/time', route)
  },
  getRandomNProperties(limit) {
    return apiClient.get('property/random/' + limit)
  },
  getCities() {
    return axios.get(
      'https://servicodados.ibge.gov.br/api/v1/localidades/municipios'
    )
  },
  sendMessage(leadMessage) {
    return apiClient.post('/property/message', leadMessage)
  }
}
