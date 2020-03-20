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
  }
}
