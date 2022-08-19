import React, {useReducer} from 'react';
import style from './todolist.module.css'
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {InputPlusListBox} from "./InputPlusListBox";
import {
    AddedTodolistAC,
    ChangeFilterTodolistAC,
    ChangeTitleTodolistAC,
    RemoveTodolistAC,
    todolistReduser
} from "./Reducer/todolistReducer";
import {addTaskAC, changeTaskStatusAC, editTitleTaskAC, removeTaskAC, tasksReducer} from "./Reducer/tasksReduser";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'yes' | 'no'

export type StateTodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type StateTaskType={
    [key:string]:Array<TasksType>
}

function AppWithReduser() {

    const todolist1=v1()
    const todolist2=v1()

    const [todolist, dispatchTodolist] = useReducer(todolistReduser,[
        {id: todolist1, title: 'What to buy', filter: 'all'},
        {id: todolist2, title: 'What to learn', filter: 'all'},
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolist1]:[
            {id: v1(), title: 'CAR', isDone: true},
            {id: v1(), title: 'PAPIROS', isDone: false},
            {id: v1(), title: 'EUROS', isDone: true},
        ],
        [todolist2]:[
            {id: v1(), title: 'NI', isDone: true},
            {id: v1(), title: 'CHE', isDone: false},
        ],
    })

    const editTitleTask = (todolistID: string, idTask: string, text: string) => {
        dispatchTasks(editTitleTaskAC(todolistID, idTask, text))
        /*setTasks({...tasks,[todolistID]:tasks[todolistID].map(
            e=>e.id===idTask?{...e,title:text}:e)})*/
    }

    const addedTask = (todolistID:string,title: string) =>{
        dispatchTasks(addTaskAC(todolistID,title))
        /*setTasks({...tasks,[todolistID]:[{
                id: v1(), title, isDone: false
            },...tasks[todolistID]]})*/
    }

    const removeTask = (todolistID:string,idTask: string) =>{
        dispatchTasks(removeTaskAC(todolistID,idTask))
     /*   setTasks({...tasks,[todolistID]:tasks[todolistID].filter(
                e=>e.id!==idTask
            )})*/
    }

    const changeChecbox = (
        todolistID:string,idTask: string, isDone: boolean) =>{
        dispatchTasks(changeTaskStatusAC(todolistID,idTask, isDone))
     /*   setTasks({...tasks,[todolistID]:tasks[todolistID].map(
                e=>e.id===idTask?{...e,isDone}:e)}

        )*/
    }

    const addedTodolistHandler = (title: string) => {
        dispatchTodolist(AddedTodolistAC(title))
   /*     const newTodolist=v1()
        setTodolist([
            {id: newTodolist, title: title, filter: 'all'},...todolist])*/
    }

    const editTitleTodolist = (todolistID: string, text: string) => {
        dispatchTodolist(ChangeTitleTodolistAC(todolistID,text))
       /* setTodolist(todolist.map(t=>t.id===todolistID?{...t,title:text}:t))*/
    }

    const deleteTodolist=(todolistID:string)=>{
        const action=RemoveTodolistAC(todolistID)
        dispatchTodolist(action)
        /*setTodolist(todolist.filter(t=>t.id!==todolistID))
        delete tasks[todolistID]*/
    }

    const filterTask = (todolistID: string, valueFilter: FilterType) => {
        dispatchTodolist(ChangeFilterTodolistAC(todolistID,valueFilter))
        /*  setTodolist(todolist.map(el => el.id === todolistID
              ? {...el, filter: valueFilter}
              : el))*/
    }








    return (
        <div className={style.app}>
            <InputPlusListBox
                colback={addedTodolistHandler}
            />
            {
                todolist.map(t => {

                    let newArrayTasks = tasks[t.id]
                    if (t.filter === 'yes') {
                        newArrayTasks = tasks[t.id].filter(t => t.isDone)
                    }
                    if (t.filter === 'no') {
                        newArrayTasks = tasks[t.id].filter(t => !t.isDone)
                    }


                    return (
                        <Todolist
                            editTitleTask={editTitleTask}
                            editTitleTodolist={editTitleTodolist}
                            deleteTodolist={deleteTodolist}
                            todolistID={t.id}
                            key={t.id}
                            filter={t.filter}
                            changeChecbox={changeChecbox}
                            addedTask={addedTask}
                            filterTask={filterTask}
                            removeTask={removeTask}
                            tasks={newArrayTasks}
                            title={t.title}/>
                    )
                })
            }

        </div>
    );
}

export default AppWithReduser;

