import React, {useState} from 'react'

import './CreateTodoItem.css'

import {createTodo} from '../../api/todos'

function CreateTodoItem({onChange}) {
  const [inputedText, setInputText] = useState('')

  function handleButtonClick() {
    if (inputedText) {
      createTodo({ text: inputedText }).then(() => {
        setInputText('')
        onChange()
      })
    }
  }

  return (
    <div className="CreateTodoItem">
      <input
        type="text"
        placeholder="Adicione um novo item..."
        value={inputedText}
        onChange={(event) => { setInputText(event.target.value) }}
      />

      <button onClick={handleButtonClick} disabled={!inputedText}>Criar</button>
    </div>
  )
}

export default CreateTodoItem
