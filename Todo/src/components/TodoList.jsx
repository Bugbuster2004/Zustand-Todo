import React, { useState } from "react";
import useTodoStore from "../app/todoStore";

function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const removeTodo = useTodoStore((state) => state.deleteTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);

  // States for editing
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleSave = (todoId) => {
    if (editText.trim()) {
      updateTodo(todoId, { title: editText });
      setEditId(null);
      setEditText("");
    }
  };

  return (
    <>
      <ul>
        {todos.map((todo) => (
          <React.Fragment key={todo.id}>
            <li
              className="course-item"
              style={{
                backgroundColor: todo.completed ? "#90EE90" : "white",
                color: todo.completed ? "white" : "black", 
              }}
            >
              <span className="course-item-col-1">
                <input
                  checked={todo.completed}
                  type="checkbox"
                  onChange={() => toggleTodo(todo.id)}
                />
              </span>

              {/* Render editable input if in edit mode */}
              {editId === todo.id ? (
                <span>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="Edit todo title..."
                  />
                  <button
                    onClick={() => handleSave(todo.id)}
                    className="save-btn"
                  >
                    Save
                  </button>
                  
                </span>
              ) : (
                <span>
                  {todo.title}
                  <button
                    onClick={() => {
                      setEditId(todo.id);
                      setEditText(todo.title);
                    }}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                </span>
              )}

              <button
                onClick={() => removeTodo(todo.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
