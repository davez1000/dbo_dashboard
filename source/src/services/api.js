import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
      'Authorization': `Bearer ${process.env.VUE_APP_AUTH_TOKEN}`
    },
    // withCredentials: false,
    timeout: 5000
  })
}
