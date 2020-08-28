import axios from '../core/axios'

export const userAPI = {
  login: postData => axios.post('/login', postData),
  register: postData => axios.post('/registration', postData),
}