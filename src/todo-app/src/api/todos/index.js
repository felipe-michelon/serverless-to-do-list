import http from '../http'

export function getTodos() {
  return http.get('/todos')
}

export function updateTodo(id, payload) {
  return http.put(`/todos/${id}`, payload)
}
export function deleteTodo(id, payload) {
  return http.delete(`/todos/${id}`)
}