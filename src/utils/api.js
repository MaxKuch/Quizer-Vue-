import axios from '../core/axios'

export const userAPI = {
  login: postData => axios.post('/login', postData),
  register: postData => axios.post('/register', postData),
  verify: token => axios.get('/verify', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Authorization': `Bearer ${token}`
  }}),
  getUserData: id => axios.get(`/user-data/${id}`),
  publishQuizResult: (userId, quizId, resultId) => axios.post('/publish-result', {
    userId,
    quizId,
    resultId
  })
}

export const quizesAPI = {
  quizesList: () => axios.get('/quizes-list'),
  getQuiz: id => axios.get(`/quiz/${id}`),
  getQuizResults: (id) => axios.get(`/quiz-results/${id}`),
  like: (userId, quizId) => axios.post('/like-quiz', {
    userId,
    quizId
  }),
  removeLike: (userId, quizId) => axios.post('/remove-like', {
    userId,
    quizId
  })
}