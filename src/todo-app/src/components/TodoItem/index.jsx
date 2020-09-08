import React from 'react'
import './TodoItem.css'

function TodoItem({item}) {
  return (
    <div className="TodoItem">
      <input type="checkbox" checked={item.checked} />
      <span>{item.text}</span>
    </div>
  )
}

export default TodoItem
