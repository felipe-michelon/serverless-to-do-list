import React from 'react'
import './TodoItem.css'
import {updateTodo} from '../../api/todos'

function TodoItem({item, onChange}) {
  function handleCheckboxClick(){
    updateTodo(item.id, { text: item.text, checked: !item.checked }).then(() => {
      onChange()
    })
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
    </div>
  )
}

export default TodoItem
