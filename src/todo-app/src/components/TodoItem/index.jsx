import React from 'react'

import './TodoItem.css'
import trashbin from './trashbin.png'

import {updateTodo, deleteTodo} from '../../api/todos'

function TodoItem({item, onChange}) {
  function handleCheckboxClick(){
    updateTodo(item.id, { text: item.text, checked: !item.checked }).then(() => {
      onChange()
    })
  }

  function handleTrashbinClick(){
    if (window.confirm('Tem certeza que quer deletar esse item?')) {
      deleteTodo(item.id, { text: item.text, checked: !item.checked }).then(() => {
        onChange()
      })
    }
  }

  return (
    <div className="TodoItem">
      <input type="checkbox" checked={item.checked} onChange={handleCheckboxClick} />
      {
        item.checked ? (
          <strike>{item.text}</strike>
        ) : (
          <span>{item.text}</span>
        )
      }

      <img
        src={trashbin}
        className="deleteTodoItem"
        alt="delete item"
        onClick={handleTrashbinClick}/>
    </div>
  )
}

export default TodoItem
