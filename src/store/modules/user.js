import { userAPI } from '../../utils/api'

export default({
  actions: {
    async login(ctx, postData){
      try{
        const {data: {data}} = await userAPI.login(postData)
        window.localStorage.setItem('token', data.jwt)
        const user = data.user
        ctx.commit('updateUser', user)
        return Promise.resolve()
      }catch(err){
        return Promise.reject(err.response)
      }
    }
  },
  mutations: {
    updateUser(state, user){
      state.user = user
    }
  },
  state: {
    user: null
  },
  getters: {
    getUser(state){
      return state.user
    }
  }
})
