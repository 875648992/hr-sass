import { login, getInfo, staff } from '@/api/user'
import { getToken, setToken, removeToken, setTime } from '@/utils/auth'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, payload) {
    state.token = payload
    setToken(payload)
    setTime(Date.now())
  },
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  isRemoveToken() {
    removeToken()
  },
  removeUserInfo(state) {
    state.token = ''
    state.userInfo = ''
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
    commit('setUserInfo', {
      ...res,
      staffPhoto: res2.staffPhoto
      // staffPhoto: '2222'
    })
  },
  logout({ commit }) {
    commit('isRemoveToken')
    commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

