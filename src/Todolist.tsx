import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, TasksType} from "./App";
import style from './todolist.module.css'

type TodolistType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (idTask: string) => void
    filterTask: (valueFilter: FilterType) => void
    addedTask: (title: string) => void
    changeChecbox: (idTask: string, isDone: boolean) => void
    filter:FilterType
}

export function Todolist(props: TodolistType) {
    const [title, setTitle] = useState('')
    const [redMessage,setRedMessage]=useState<string|null>(null)

    const addedStateInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setRedMessage(null)
    }

    const addedTaskHandler = () => {
        if(title.trim()!==''){
            props.addedTask(title.trim())
        }else{
            setRedMessage('Title is required')
        }
        setTitle('')
    }

    const onKeyPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addedTaskHandler()
        }
    }

    const removeTaskHandler = (idTask: string) => {
        props.removeTask(idTask)
    }

    const filterTaskHandler = (valueFilter: FilterType) => {
        props.filterTask(valueFilter)
    }

    const changeChecboxHandler = (idTask: string, isDone: boolean) => {
        props.changeChecbox(idTask, isDone)
    }

    return (
        <div>
            <h2>{props.title}</h2>
            <div>
                <input className={redMessage ? style.redFrame:style.input}
                    onKeyPress={onKeyPressEnterHandler}
                    value={title}
                    onChange={addedStateInputHandler}
                />
                <button
                    onClick={addedTaskHandler}
                >+
                </button>
            </div>
            {redMessage&&<div className={style.redMessage}>{redMessage} </div>}

            <ul>
                {
                    props.tasks.map(el => {
                        return (
                            <li key={el.id}>
                                <input
                                    onChange={(e) => {
                                        changeChecboxHandler(el.id, e.currentTarget.checked)
                                    }}
                                    type='checkbox'
                                    checked={el.isDone}
                                />
                                <span>{el.title}</span>
                                <button onClick={() => removeTaskHandler(el.id)}>del</button>
                            </li>
                        )
                    })
                }

            </ul>
            <div>
                <button
                    className={props.filter==='all' ? style.buttonFilter : ''}
                    onClick={() => filterTaskHandler('all')}
                >ALL</button>
                <button
                    className={props.filter==='yes' ? style.buttonFilter : ''}
                    onClick={() => filterTaskHandler('yes')}
                >YES</button>
                <button
                    className={props.filter==='no' ? style.buttonFilter : ''}
                    onClick={() => filterTaskHandler('no')}>
                    NO</button>
            </div>
        </div>
    )
}