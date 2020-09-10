import React, {useState, useEffect} from 'react'

import {getTodos} from '../../api/todos'
import TodoItem from '../TodoItem/'
import CreateTodoItem from '../CreateTodoItem/'

function TodoList() {
  const [items, setItems] = useState([])

  function fetch(){
    getTodos().then(({data}) => {
      setItems(data)
    })
  }
  useEffect(fetch, [])

  return (
    <div>
      <CreateTodoItem onChange={fetch} />
      <br />

      {items.map(item => (
        <TodoItem item={item} onChange={fetch} key={item.id}/>
      ))}
    </div>
  )
}

export default TodoList
