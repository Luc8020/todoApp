<template>
    <div class="auth-form">
      <h2>Login</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="formData.email" type="email" placeholder="Email" required>
        <input v-model="formData.password" type="password" placeholder="Password" required>
        <button type="submit">Sign In</button>
      </form>
      <div class="auth-links">
        Don't have an account? <a @click="$emit('switch-form')">Register here</a>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const emit = defineEmits(['logged-in', 'switch-form'])
  const formData = ref({
    email: '',
    password: ''
  })
  
  const handleSubmit = async () => {
    try {
        console.log(formData.value)
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData.value)
      })
      
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Login failed')
  
      localStorage.setItem('authToken', data.token)
      emit('logged-in')
      formData.value = { email: '', password: '' }
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }
  </script>
  
  <style scoped>
  </style>