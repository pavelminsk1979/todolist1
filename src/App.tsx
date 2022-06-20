import React, {useState} from 'react';
import style from './todolist.module.css'
import {Todolist} from "./Todolist";

export type TasksType={
    id:number
    title:string
    isDone:boolean
}

function App() {
    const [tasks,setTasks]=useState([
        {id:1,title:'CAR',isDone:true},
        {id:2,title:'PAPIROS',isDone:false},
        {id:3,title:'EUROS',isDone:true},
        {id:4,title:'DOG',isDone:false},
    ])
    const removeTask = (idTask:number) => {
        setTasks(tasks.filter(t=>t.id !==idTask))
        console.log(tasks)
    }

    const [filter,serFilter]=useState('all')
    const filterTask = (valueFilter:string) => {
        serFilter(valueFilter)
    }
    let newArrayTasks=tasks
    if(filter==='yes'){newArrayTasks=tasks.filter(t=> t.isDone)}
    if(filter==='no'){newArrayTasks=tasks.filter(t=> !t.isDone)}

    return (
        <div className={style.app}>
            <Todolist
                filterTask={filterTask}
                removeTask={removeTask}
                tasks={newArrayTasks}
                title={'What to buy'}/>
        </div>
    );
}

export default App;

