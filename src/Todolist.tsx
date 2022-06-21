import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, TasksType} from "./App";
import style from './todolist.module.css'

type TodolistType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (todolistID:string,idTask: string) => void
    filterTask: (todolistID:string,valueFilter: FilterType) => void
    addedTask: (todolistID:string,title: string) => void
    changeChecbox: ( todolistID:string,idTask: string, isDone: boolean) => void
    filter:FilterType
    todolistID:string
    deleteTodolist:(todolistID:string)=>void
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
            props.addedTask(props.todolistID,title.trim())
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

    const removeTaskHandler = (todolistID:string,idTask: string) => {
        props.removeTask(todolistID,idTask)
    }

    const filterTaskHandler = (todolistID:string,valueFilter: FilterType) => {
        props.filterTask(todolistID,valueFilter)
    }

    const changeChecboxHandler = ( todolistID:string,idTask: string, isDone: boolean) => {
        props.changeChecbox( todolistID,idTask, isDone)
    }

    const deleteTodolistHandler = () => {
      props.deleteTodolist(props.todolistID)
    }


    return (
        <div>
            <h3>
                {props.title}
                <button
                    onClick={deleteTodolistHandler}
                    className={style.deletListBox}>X</button>
            </h3>

               {/* <button className={style.buttonPlasListBox}>plas list box</button>*/}

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
                                        changeChecboxHandler(
                                            props.todolistID,el.id, e.currentTarget.checked)
                                    }}
                                    type='checkbox'
                                    checked={el.isDone}
                                />
                                <span>{el.title}</span>
                                <button onClick={
                                    () => removeTaskHandler(props.todolistID,el.id)}>del</button>
                            </li>
                        )
                    })
                }

            </ul>
            <div>
                <button
                    className={props.filter==='all' ? style.buttonFilter : ''}
                    onClick={() => filterTaskHandler(props.todolistID,'all')}
                >ALL</button>
                <button
                    className={props.filter==='yes' ? style.buttonFilter : ''}
                    onClick={() => filterTaskHandler(props.todolistID,'yes')}
                >YES</button>
                <button
                    className={props.filter==='no' ? style.buttonFilter : ''}
                    onClick={() => filterTaskHandler(props.todolistID,'no')}>
                    NO</button>
            </div>
        </div>
    )
}