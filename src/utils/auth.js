import Cookies from 'js-cookie'

const TokenKey = 'hm-hrSass-token'
const CurrentTime = 'CurrentTime'

export function getToken() {
  return Cookies.get(TokenKey) || null
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTime() {
  return Cookies.get(CurrentTime)
}

export function setTime(time) {
  return Cookies.set(CurrentTime, time)
}
