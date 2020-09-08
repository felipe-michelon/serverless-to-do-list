import http from '../http'

export function getTodos() {
  return http.get('/todos')
}
