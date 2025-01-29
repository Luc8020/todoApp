<template>
  <div class="container">
    <auth-register 
      v-if="!authToken && activeForm === 'register'"
      @switch-form="activeForm = 'login'"
      @registered="activeForm = 'login'"
    />
    <auth-login 
      v-if="!authToken && activeForm === 'login'"
      @switch-form="activeForm = 'register'"
      @logged-in="handleLogin"
    />
    <todo-list 
      v-if="authToken"
      @logout="logout"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AuthRegister from './components/Register.vue'
import AuthLogin from './components/Login.vue'
import TodoList from './components/TodoList.vue'
import { useAuth } from './composables/useAuth'

const { authToken, checkAuth, logout } = useAuth()
const activeForm = ref('login')

onMounted(() => {
  checkAuth()
})

const handleLogin = () => {
  checkAuth()
}
</script>

<style scoped>
.container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
}
</style>