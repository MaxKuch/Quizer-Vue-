import { userAPI } from '../../utils/api'

export default({
  actions: {
    async verify(ctx, token){
      try{
        const {data: {data}} = await userAPI.verify(token)
        const user = data.user
        ctx.commit('updateUser', {name: user.name, id: user.id, isAuth: true})
      } catch(err){
        console.error(err)
        throw err.response
      }
    },
    async login(ctx, postData){
      try{
        const {data: {data}} = await userAPI.login(postData)
        window.localStorage.setItem('token', data.jwt)
        const user = data.user
        ctx.commit('updateUser', {name: user.name, id: user.id, isAuth: true})
      } catch(err){
        throw err.response
      }
    },
    async register(ctx, postData){
      try{
        const {data: {data}} = await userAPI.register(postData)
        window.localStorage.setItem('token', data.jwt)
        const user = data.user
        ctx.commit('updateUser', {name: user.name, id: user.id, isAuth: true})
      } catch(err){
        throw err.response
      }
    },
    logout(ctx){
      window.localStorage.removeItem('token')
      ctx.commit('updateUser', {name: null, id: null, isAuth: false})
    }
  },
  mutations: {
    updateUser(state, user){
      state.name = user.name
      state.id = user.id
      state.isAuth = user.isAuth
    }
  },
  state: {
    name: null,
    id: null,
    isAuth: false
  },
  getters: {
    getUserName: state => state.name,
    getUserId: state => state.id,
    getIsUserAuth: state => state.isAuth
  }
})
