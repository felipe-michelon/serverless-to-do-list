import React, {useState, useEffect} from 'react'

import {getTodos} from '../../api/todos'
import TodoItem from '../TodoItem/'

function TodoList() {
  const [items, setItems] = useState([])

  function fetch(){
    getTodos().then(({data}) => {
      setItems(data)
    })
  }
  useEffect(fetch, [])

  return items.map(item => (
    <TodoItem item={item} onChange={fetch} key={item.id}/>
  ))
}

export default TodoList
