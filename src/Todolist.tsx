import React from "react";
import style from './todolist.module.css'
import {InputPlusListBox} from "./InputPlusListBox";
import {EditHeaderTitle} from "./EditHeaderTitle";
import {FilterType, TasksType} from "./AppWithReduser";

type TodolistType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (todolistID: string, idTask: string) => void
    filterTask: (todolistID: string, valueFilter: FilterType) => void
    addedTask: (todolistID: string, title: string) => void
    changeChecbox: (todolistID: string, idTask: string, isDone: boolean) => void
    filter: FilterType
    todolistID: string
    deleteTodolist: (todolistID: string) => void
    editTitleTask: (todolistID: string, idTask: string, text: string) => void
    editTitleTodolist: (todolistID: string, text: string) => void

}

export function Todolist(props: TodolistType) {

    const editTitleTodolistHandler = (text: string) => {
        props.editTitleTodolist(props.todolistID, text)
    }

    const editTitleTaskHandler = (idTask: string, text: string) => {
        props.editTitleTask(props.todolistID, idTask, text)
    }

    const removeTaskHandler = (todolistID: string, idTask: string) => {
        props.removeTask(todolistID, idTask)
    }

    const filterTaskHandler = (todolistID: string, valueFilter: FilterType) => {
        props.filterTask(todolistID, valueFilter)
    }

    const changeChecboxHandler = (todolistID: string, idTask: string, isDone: boolean) => {
        props.changeChecbox(todolistID, idTask, isDone)
    }

    const deleteTodolistHandler = () => {
        props.deleteTodolist(props.todolistID)
    }

    const addedTaskHandler = (title: string) => {
        props.addedTask(props.todolistID, title)
    }

    return (
        <div style={{minWidth: '250px'}}>
            <h3>
                <EditHeaderTitle
                    colback={editTitleTodolistHandler}
                    text={props.title}/>

                <button
                    onClick={deleteTodolistHandler}
                    className={style.deletListBox}>X
                </button>
            </h3>

            <InputPlusListBox
                colback={addedTaskHandler}
            />

            <ul>
                {
                    props.tasks.map(el => {
                        return (
                            <li key={el.id}>
                                <input
                                    onChange={(e) => {
                                        changeChecboxHandler(
                                            props.todolistID, el.id, e.currentTarget.checked)
                                    }}
                                    type='checkbox'
                                    checked={el.isDone}
                                />
                                <EditHeaderTitle
                                    colback={
                                        (text: string) => editTitleTaskHandler(el.id, text)}
                                    text={el.title}
                                />
                                <button onClick={
                                    () => removeTaskHandler(props.todolistID, el.id)}>del
                                </button>
                            </li>
                        )
                    })
                }

            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? style.buttonFilter : ''}
                    onClick={() => filterTaskHandler(props.todolistID, 'all')}
                >ALL
                </button>
                <button
                    className={props.filter === 'yes' ? style.buttonFilter : ''}
                    onClick={() => filterTaskHandler(props.todolistID, 'yes')}
                >YES
                </button>
                <button
                    className={props.filter === 'no' ? style.buttonFilter : ''}
                    onClick={() => filterTaskHandler(props.todolistID, 'no')}>
                    NO
                </button>
            </div>
        </div>
    )
}