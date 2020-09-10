import React, {useState, useEffect} from 'react'

import './TodoList.css'

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
      <div className="CreateTodo">
        <CreateTodoItem onChange={fetch} />
      </div>

      <div className="TodoItems">
        {items.map(item => (
          <TodoItem item={item} onChange={fetch} key={item.id}/>
        ))}
      </div>
    </div>
  )
}

export default TodoList
