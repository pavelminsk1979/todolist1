import style from './todolist.module.css'
import {Todolist} from "./Todolist";
import {InputPlusListBox} from "./InputPlusListBox";
import {
    AddedTodolistAC,
    ChangeFilterTodolistAC,
    ChangeTitleTodolistAC,
    RemoveTodolistAC,
} from "./Reducer/todolistReducer";
import {addTaskAC, changeTaskStatusAC, editTitleTaskAC, removeTaskAC, tasksReducer} from "./Reducer/tasksReduser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Redux/Store";
import { Clock } from './Clock';
import {ClockMechanik} from "./ClockMechanik";


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

export function AppWithRedux() {


    const todolist=useSelector<AppRootStateType,Array<StateTodolistType>>(
        state=>state.todolists)
        const tasks=useSelector<AppRootStateType,StateTaskType>(
            state=> state.tasks)
    const dispatch=useDispatch()

    const editTitleTask = (todolistID: string, idTask: string, text: string) => {
        dispatch(editTitleTaskAC(todolistID, idTask, text))
    }

    const addedTask = (todolistID:string,title: string) =>{
        dispatch(addTaskAC(todolistID,title))
    }

    const removeTask = (todolistID:string,idTask: string) =>{
        dispatch(removeTaskAC(todolistID,idTask))
    }

    const changeChecbox = (
        todolistID:string,idTask: string, isDone: boolean) =>{
        dispatch(changeTaskStatusAC(todolistID,idTask, isDone))
    }

    const addedTodolistHandler = (title: string) => {
        dispatch(AddedTodolistAC(title))
    }

    const editTitleTodolist = (todolistID: string, text: string) => {
        dispatch(ChangeTitleTodolistAC(todolistID,text))
    }

    const deleteTodolist=(todolistID:string)=>{
        const action=RemoveTodolistAC(todolistID)
        dispatch(action)
    }

    const filterTask = (todolistID: string, valueFilter: FilterType) => {
        dispatch(ChangeFilterTodolistAC(todolistID,valueFilter))
    }



    return (
        <div className={style.app}>
            <Clock/>
            <ClockMechanik/>
            <InputPlusListBox
                colback={addedTodolistHandler}
            />
            {
                todolist.map(t => {

                    let newArrayTasks = tasks[t.id]
                    if (t.filter === 'yes') {
                        newArrayTasks = tasks[t.id].filter(ta => ta.isDone)
                    }
                    if (t.filter === 'no') {
                        newArrayTasks = tasks[t.id].filter(ta => !ta.isDone)
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

