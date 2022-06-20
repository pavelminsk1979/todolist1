import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {FilterType, TasksType} from "./App";

type TodolistType = {
    title: string
    tasks: Array<TasksType>
    removeTask:(idTask:string)=>void
    filterTask:(valueFilter:FilterType)=>void
    addedTask:(title: string)=>void
}

export function Todolist(props: TodolistType) {
    const[title,setTitle]=useState('')

    const addedStateInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const  addedTaskHandler = () => {
      props.addedTask(title)
        setTitle('')
    }

    const onKeyPressEnterHandler = (e:KeyboardEvent<HTMLInputElement>) => {
if(e.key==='Enter'){addedTaskHandler()}
    }

    const removeTaskHandler = (idTask:string) => {
        props.removeTask(idTask)
    }

    const filterTaskHandler = (valueFilter:FilterType) => {
      props.filterTask(valueFilter)
    }

    return (
        <div>
            <h2>{props.title}</h2>
            <div>
                <input
                    onKeyPress={onKeyPressEnterHandler}
                    value={title}
                    onChange={addedStateInputHandler}
                />
                <button
                    onClick={addedTaskHandler}
                >+</button>
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