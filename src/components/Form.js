import React, { useReducer, useState, useEffect} from 'react';
import Todo from './Todo';

export const actions = {
    addToList: "addToList",
    toggleItem: "toggleItem",
    deleteItem: "deleteItem"
}

function reducer(todos, action){
    switch(action.type){
        case actions.addToList:
            return [...todos, newTodo(action.payload.name) ]
        case actions.toggleItem:
            return todos.map(todo =>{
                if(todo.id === action.payload.id){
                    return {...todo, complete: !todo.complete}
                }else{
                    return todo
                }
            })
        case actions.deleteItem:
            return todos.filter(todo => todo.id !== action.payload.id)
            default:
                return todos
    }
}

function newTodo(name) {
    return {id: Date.now(), name : name, complete: false};
}

export default function Form(){
    const [todos, dispatch] = useReducer(reducer, []);
    const [name, setName] = useState("");

function processSubmit(e){
    e.preventDefault();
    dispatch({type: actions.addToList, payload: {name : name} });
    setName("");
}

useEffect(()=>{
    const data = localStorage.getItem("todoPersist");
    if(data){
        dispatch({type: actions.addToList, payload: {name: JSON.parse(data)}})
    }
});

useEffect(() =>{
    localStorage.setItem("todoPersist", JSON.stringify(todos))
})


return(
        <div>
            <form onSubmit = {processSubmit}>
                <input type="text" value={name} onChange={e => setName(e.target.value)}/>
                <button>Submit</button>
            </form>
            {todos.map(todo => {
              return <Todo key = {todo.id} todo = {todo} dispatch = {dispatch} />
            })}
        </div>
    )
}