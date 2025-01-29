<template>
    <div class="auth-form">
      <h2>Register</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="formData.username" type="text" placeholder="Username" required>
        <input v-model="formData.email" type="email" placeholder="Email" required>
        <input v-model="formData.password" type="password" placeholder="Password" required>
        <button type="submit">Create Account</button>
      </form>
      <div class="auth-links">
        Already have an account? <a @click="$emit('switch-form')">Login here</a>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const emit = defineEmits(['registered', 'switch-form'])
  const formData = ref({
    username: '',
    email: '',
    password: ''
  })
  
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData.value)
      })
      
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Registration failed')
      
      alert('Registration successful! Please login.')
      emit('registered')
      formData.value = { username: '', email: '', password: '' }
    } catch (error) {
      alert(error.message)
    }
  }
  </script>
  
  <style scoped>
  .auth-form {
    display: block;
  }
  
  .auth-links {
    margin-top: 1rem;
    text-align: center;
  }
  
  .auth-links a {
    color: #646cff;
    cursor: pointer;
    text-decoration: underline;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    box-sizing: border-box;
  }
  
  button {
    width: 100%;
    padding: 12px;
    background-color: #646cff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    margin: 10px 0;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #4c51cc;
  }
  </style>