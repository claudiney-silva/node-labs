import axios from 'axios'

const { REACT_APP_API_URL, NODE_ENV } = process.env

const api = axios.create({
  baseURL: NODE_ENV === 'development' ? `${REACT_APP_API_URL}/api` : '/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

export default api
