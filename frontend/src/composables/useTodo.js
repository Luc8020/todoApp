import { ref } from 'vue'

const API_BASE = 'http://localhost:3000'

export const useTodo = () => {
  const todos = ref([])
  
  const loadTodos = async () => {
    try {
      const response = await fetch(`${API_BASE}/todo`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      const data = await response.json()
      todos.value = data.todos
    } catch (error) {
      alert(error.message)
    }
  }

  return {
    todos,
    loadTodos
  }
}