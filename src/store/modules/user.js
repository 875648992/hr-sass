import { login } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
const state = {
  token: getToken()
}
const mutations = {
  setToken(state, payload) {
    state.token = payload
    setToken(payload)
  }
}
const actions = {
  async getToken({ commit }, form) {
    const res = await login(form)
    console.log(res)
    commit('setToken', res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

