import router from '../../router'

export default({
  actions: {
    redirect(ctx){
      if(ctx.state.path === 'login' && ctx.rootState.user.isAuth 
      || ctx.state.path === 'register' && ctx.rootState.user.isAuth){
        router.push('/')
      }
      if(ctx.state.path === 'profile' && !ctx.rootState.user.isAuth)
        router.push('/login')
    },
  },
  mutations: {
    addPath(state, path){
      state.path = path
    }
  },
  state: {
    path: null
  }
})