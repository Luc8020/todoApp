import { ref } from 'vue'

const authToken = ref(localStorage.getItem('authToken'))

export const useAuth = () => {
  const checkAuth = () => {
    authToken.value = localStorage.getItem('authToken')
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    authToken.value = null
  }

  return {
    authToken,
    checkAuth,
    logout
  }
}