import { StateTaskType } from "../App"
import {v1} from "uuid";
import { ActionAddedType } from "./todolistReducer";


export const tasksReducer=(state:StateTaskType,action:ActionType):StateTaskType=>{
    switch(action.type) {
        case'REMOVE-TASK': {
            return {...state,[action.idTodolist]:state[action.idTodolist].filter(
                el=>el.id!==action.idTask)}
        }
        case'ADDED-TASK': {
            return {...state,[action.todID]:[
                    {id:v1(), title:action.title, isDone: false},...state[action.todID]]}
        }
        case 'CHANGE-ISDONE-TASK':{
            return {...state,[action.todID]:state[action.todID].map(
                el=>el.id===action.idTask ?{...el,isDone:action.isDone}:el)}
        }
        case 'ADDED-TODOLIST':{
            return {...state,[action.newTodolistID]:[]}
        }
        default:
            return state
    }
}
type ActionType=removeTaskACType|addTaskACType|changeTaskStatusACType|ActionAddedType


type removeTaskACType= ReturnType<typeof removeTaskAC >
export const removeTaskAC = (id:string,todolistID:string) => {
     return{
         type:'REMOVE-TASK',
         idTask:id,
         idTodolist:todolistID

     }as const
   }

type addTaskACType= ReturnType<typeof addTaskAC >
export const addTaskAC = (title:string,todID:string) => {
    return{
        type:'ADDED-TASK',
        title:title,
        todID:todID

    }as const
}

type changeTaskStatusACType= ReturnType<typeof changeTaskStatusAC >
export const changeTaskStatusAC = (idTask:string,isDone:boolean,todID:string) => {
    return{
        type:'CHANGE-ISDONE-TASK',
        idTask,
        isDone,
        todID

    }as const
}