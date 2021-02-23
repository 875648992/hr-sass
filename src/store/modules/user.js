import { login, getInfo, staff } from '@/api/user'
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
    const res2 = await staff(res.userId)
    console.log(res)
    commit('setUserInfo', {
      ...res,
      staffPhoto: res2.staffPhoto
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

