<template>
    <div class="protected-content">
      <div class="header">
        <h2>Your ToDos</h2>
        <button @click="$emit('logout')">Logout</button>
      </div>
      <div class="todo-section">
        <form @submit.prevent="addTodo">
          <input v-model="newTodo.title" type="text" placeholder="Title" required>
          <input v-model="newTodo.description" type="text" placeholder="Description">
          <button type="submit">Add Todo</button>
        </form>
        <ul id="todoList">
          <li v-for="todo in todos" :key="todo.id" class="todo-item">
            <div class="todo-content">
              <h3>{{ todo.title }}</h3>
              <p style="word-wrap: break-word;">{{ todo.description }}</p>
            </div>
            <button @click="deleteTodo(todo.id)" class="delete-btn">Delete</button>
            <input type="checkbox" @change="changeTodoStatus(todo.id, !todo.completed)" :checked="todo.completed">
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useTodo } from '../composables/useTodo'
  
  const { todos, loadTodos } = useTodo()
  const newTodo = ref({ title: '', description: '' })
  
  onMounted(() => {
    loadTodos()
  })
  
  const addTodo = async () => {
    try {
      const response = await fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(newTodo.value)
      })
  
      if (!response.ok) throw new Error('Failed to create todo')
      
      newTodo.value = { title: '', description: '' }
      loadTodos()
    } catch (error) {
      alert(error.message)
    }
  }

  const changeTodoStatus = async (todoId) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${todoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
  
      if (!response.ok) throw new Error('Failed to update todo status')
      loadTodos()
    } catch (error) {
      alert(error.message)
    }
  }
  
  const deleteTodo = async (todoId) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${todoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
  
      if (!response.ok) throw new Error('Failed to delete todo')
      loadTodos()
    } catch (error) {
      alert(error.message)
    }
  }
  </script>
  
  <style scoped>
  .todo-section {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .header button {
    width: auto;
    padding: 8px 16px;
    background-color: #ff4444;
  }
  
  #todoList {
    list-style: none;
    padding: 0;
  }
  
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin: 10px 0;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #eee;
  }
  
  .todo-content h3 {
    margin: 0 0 5px 0;
    font-size: 18px;
  }
  
  .todo-content p {
    margin: 0;
    color: #666;
    font-size: 14px;
  }
  
  .delete-btn {
    width: auto;
    padding: 6px 12px;
    background-color: #ff4444;
    margin: 0;
  }
  
  .delete-btn:hover {
    background-color: #cc0000;
  }
  
  #todoForm {
    margin-bottom: 20px;
  }
  </style>