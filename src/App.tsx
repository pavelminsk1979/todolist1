import React, {useState} from 'react';
import style from './todolist.module.css'
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {InputPlusListBox} from "./InputPlusListBox";

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
export type StateTaskType = {
    [key: string]: Array<TasksType>
}

function App() {

    const todolist1 = v1()
    const todolist2 = v1()

    const [todolist, setTodolist] = useState<Array<StateTodolistType>>([
        {id: todolist1, title: 'What to buy', filter: 'all'},
        {id: todolist2, title: 'What to learn', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<StateTaskType>({
        [todolist1]: [
            {id: v1(), title: 'CAR', isDone: true},
            {id: v1(), title: 'PAPIROS', isDone: false},
            {id: v1(), title: 'EUROS', isDone: true},
            {id: v1(), title: 'DOG', isDone: false},
        ],
        [todolist2]: [
            {id: v1(), title: 'NI', isDone: true},
            {id: v1(), title: 'CHE', isDone: false},
            {id: v1(), title: 'GO', isDone: true},

        ],
    })

    const editTitleTodolist = (todolistID: string, text: string) => {
        setTodolist(todolist.map(el=>el.id===todolistID
            ?{...el,title:text}:el))
    }

    const creatingTodolist = (title: string) => {
        const newTodolist = v1()
        setTodolist([
            {id: newTodolist, title: title, filter: 'all'}, ...todolist])
        setTasks({[newTodolist]:[],...tasks})

    }

    const deleteTodolist = (todolistID: string) => {
        setTodolist(todolist.filter(t => t.id !== todolistID))
        delete tasks[todolistID]
    }

    const filterTask = (todolistID: string, valueFilter: FilterType) => {
        setTodolist(todolist.map(el => el.id === todolistID
            ? {...el, filter: valueFilter}
            : el))
    }



    const editTitleTask = (todolistID: string,idTask: string,text: string) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>
                el.id===idTask?{...el,title:text}:el)})
    }

    const addedTask = (todolistID: string, title: string) => {
        setTasks({
            ...tasks, [todolistID]: [{
                id: v1(), title, isDone: false
            }, ...tasks[todolistID]]
        })
    }

    const removeTask = (todolistID: string, idTask: string) => {
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID].filter(
                e => e.id !== idTask
            )
        })
    }


    const changeChecbox = (
        todolistID: string, idTask: string, isDone: boolean) => {
        setTasks({
                ...tasks, [todolistID]: tasks[todolistID].map(
                    e => e.id === idTask ? {...e, isDone} : e)
            }
        )
    }





    return (
        <div className={style.app}>

            <InputPlusListBox colback={creatingTodolist}/>

           <div className={style.todoBox}>
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
                               editTitleTodolist={editTitleTodolist}
                               editTitleTask={editTitleTask}
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

        </div>
    );
}

export default App;

