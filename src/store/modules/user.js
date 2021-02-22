import { login, getInfo } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, payload) {
    state.token = payload
    setToken(payload)
  },
  setUserInfo(state, payload) {
    state.userInfo = payload
  }
}
const actions = {
  async getToken({ commit }, form) {
    const res = await login(form)
    commit('setToken', res)
  },
  async getUserInfo({ commit }) {
    const res = await getInfo()
    commit('setUserInfo', res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

