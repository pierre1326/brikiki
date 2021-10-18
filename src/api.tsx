import axios from 'axios'

const apiUser = axios.create({
  baseURL: 'http://149.56.44.20:3000/user/',
  headers: {
    "Content-type": "application/json"
  }
})

export default apiUser