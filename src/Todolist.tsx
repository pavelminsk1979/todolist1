import React from "react";
import {TasksType} from "./App";

type TodolistType = {
    title: string
    tasks: Array<TasksType>
    removeTask:(idTask:number)=>void
    filterTask:(valueFilter:string)=>void
}

export function Todolist(props: TodolistType) {

    const removeTaskHandler = (idTask:number) => {
        props.removeTask(idTask)
    }

    const filterTaskHandler = (valueFilter:string) => {
      props.filterTask(valueFilter)
    }

    return (
        <div>
            <h2>{props.title}</h2>
            <div>
                <input/>
                <button>+</button>
            </div>

            <ul>
                {
                    props.tasks.map(el => {
                        return (
                            <li key={el.id}>
                                <input type='checkbox' checked={el.isDone}/>
                                <span>{el.title}</span>
                                <button onClick={()=>removeTaskHandler(el.id)}>del</button>
                            </li>
                        )
                    })
                }

            </ul>
            <div>
                <button onClick={()=>filterTaskHandler('all')}>ALL</button>
                <button onClick={()=>filterTaskHandler('yes')}>YES</button>
                <button onClick={()=>filterTaskHandler('no')}>NO</button>
            </div>
        </div>
    )
}