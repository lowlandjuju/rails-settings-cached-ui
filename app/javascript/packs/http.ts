import axios from 'axios'

// @ts-ignore
let token = document.querySelector('meta[name="csrf-token"]').content

const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': token,
  },
}

const http = {
  get: (url) => {
    return axios.get(url, config)
  },

  delete: (url) => {
    return axios.delete(url, config)
  },

  post: (url, body) => {
    return axios.post(url, JSON.stringify(body), config)
  },

  postForm: (url, formData) => {
    return axios({
      method: 'post',
      url,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  put: (url, body) => {
    return axios.put(url, JSON.stringify(body), config)
  },
}

export default http
