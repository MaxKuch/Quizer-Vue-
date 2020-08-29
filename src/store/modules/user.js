import { userAPI } from '../../utils/api'

export default({
  actions: {
    async getUserData(ctx, token){
      try{
        const {data: {data}} = await userAPI.getUserData(token)
        const user = data.user
        ctx.commit('updateUser', {name: user.name})
        return Promise.resolve()
      } catch(err){
        console.error(err)
        return Promise.reject(err.response)
      }
    },
    async login(ctx, postData){
      try{
        const {data: {data}} = await userAPI.login(postData)
        window.localStorage.setItem('token', data.jwt)
        const user = data.user
        ctx.commit('updateUser', {name: user.name})
        return Promise.resolve()
      } catch(err){
        return Promise.reject(err.response)
      }
    },
    async register(ctx, postData){
      try{
        const {data: {data}} = await userAPI.register(postData)
        window.localStorage.setItem('token', data.jwt)
        const user = data.user
        ctx.commit('updateUser', {name: user.name})
        return Promise.resolve()
      } catch(err){
        return Promise.reject(err.response)
      }
    },
    logout(ctx){
      window.localStorage.removeItem('token')
      ctx.commit('updateUser', {name: null})
    }
  },
  mutations: {
    updateUser(state, user){
      state.name = user.name
    }
  },
  state: {
    name: null
  },
  getters: {
    getUserName: state => state.name
  }
})
