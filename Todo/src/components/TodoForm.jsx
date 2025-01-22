import React, {useState} from 'react'

import useTodoStore from '../app/todoStore'

function TodoForm() {
   const [Title, setTitle] = useState("")
    const addTodo = useTodoStore((state) => state.addTodo)

    const handleSubmit = () =>{
        if(!Title) return alert("please add a title");
        addTodo({
            id: Math.ceil(Math.random() * 1000000),
            title:Title
        })
        setTitle("")
    }
    return (
        <div className="form-container">
            <input 
            value={Title}
            onChange={(e) => {
                setTitle(e.target.value)
            }}
            className="form-input" />
            <button 
            onClick={() => {
                handleSubmit();
            }}
            className="form-submit-btn">
                Add Course
            </button>
        </div>
      )
    }


export default TodoForm