import React, {useState} from 'react';
import style from './todolist.module.css'
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'yes' | 'no'

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'CAR', isDone: true},
        {id: v1(), title: 'PAPIROS', isDone: false},
        {id: v1(), title: 'EUROS', isDone: true},
        {id: v1(), title: 'DOG', isDone: false},
    ])
    const removeTask = (idTask: string) => {
        setTasks(tasks.filter(t => t.id !== idTask))
        console.log(tasks)
    }

    const addedTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: true}, ...tasks])
    }

    const [filter, serFilter] = useState<FilterType>('all')
    const filterTask = (valueFilter: FilterType) => {
        serFilter(valueFilter)
    }
    let newArrayTasks = tasks
    if (filter === 'yes') {
        newArrayTasks = tasks.filter(t => t.isDone)
    }
    if (filter === 'no') {
        newArrayTasks = tasks.filter(t => !t.isDone)
    }

    return (
        <div className={style.app}>
            <Todolist
                addedTask={addedTask}
                filterTask={filterTask}
                removeTask={removeTask}
                tasks={newArrayTasks}
                title={'What to buy'}/>
        </div>
    );
}

export default App;

