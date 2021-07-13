import React from 'react'
import {actions} from "./Form.js"

export default function Todo({todo, dispatch}) {
    return (
        <div>
            <span style= {{textDecoration: todo.complete ? "line-through" : "black" }}>{todo.name}</span>
            <input type = "checkbox" name="complete" onClick={() => dispatch({type:actions.toggleItem, payload:{id: todo.id}})}/>
            <button onClick={() => dispatch({type:actions.deleteItem, payload:{id: todo.id}})}>Delete</button>
        </div>
    )
}