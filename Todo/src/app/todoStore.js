import {create} from "zustand"
import {devtools, persist} from 'zustand/middleware'

const todoStore = (set) =>({
   todos:[],
   addTodo: (todo) =>{
    set((state)=>({
        todos:[todo, ...state.todos]
    }))
   
   },
   deleteTodo:(todoId) =>{
    set((state)=>({
        todos:state.todos.filter((todo)=> todo.id!== todoId)
    }))
   },
   toggleTodo:(todoId)=>{
    set((state)=>({
        todos:state.todos.map((todo)=>{
            if(todo.id===todoId){
                return {...todo,completed:!todo.completed}
                
            }
            return todo;
        })
    }))
   },

   updateTodo: (todoId, updatedData) => {
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, ...updatedData }; 
        }
        return todo;
      }),
    }));
  },
})

const useTodoStore = create(
    devtools(
        persist(todoStore, {
            name: "todos",
        })
    )
)

export default useTodoStore;