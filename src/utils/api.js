import axios from '../core/axios'

export const userAPI = {
  login: postData => axios.post('/login', postData),
  register: postData => axios.post('/register', postData),
  getUserData: token => axios.get('/verify', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Authorization': `Bearer ${token}`
  }})
}

export const quizesAPI = {
  quizesList: () => axios.get('/quizes-list'),
  getQuiz: id => axios.get(`/quiz/${id}`),
  getQuizResults: (id) => axios.get(`/quiz-results/${id}`)
}