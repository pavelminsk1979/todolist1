
import {v1} from "uuid";
import { ActionAddedType } from "./todolistReducer";
import {StateTaskType} from "../AppWithReduser";


export const tasksReducer=(state:StateTaskType,action:ActionType):StateTaskType=>{
    switch(action.type) {
        case'REMOVE-TASK': {
            return {...state,[action.todolistID]:state[action.todolistID].filter(
                el=>el.id!==action.idTask)}
        }
        case'ADDED-TASK': {
            return {...state,[action.todolistID]:[
                    {id:v1(), title:action.title, isDone: false},...state[action.todolistID]]}
        }
        case 'CHANGE-ISDONE-TASK':{
            return {...state,[action.todolistID]:state[action.todolistID].map(
                el=>el.id===action.idTask ?{...el,isDone:action.isDone}:el)}
        }
        case "CHANGE-TITLE-TASK":{
            return {...state,[action.todolistID]:state[action.todolistID].map(
                el=>el.id===action.idTask ?{...el,title:action.text}:el)}
        }
        case 'ADDED-TODOLIST':{
            return {...state,[action.newTodolistID]:[]}
        }
        default:
            return state
    }
}
type ActionType=removeTaskACType|addTaskACType|changeTaskStatusACType|ActionAddedType|editTitleTaskType


type removeTaskACType= ReturnType<typeof removeTaskAC >
export const removeTaskAC = (todolistID:string,idTask:string) => {
     return{
         type:'REMOVE-TASK',
         todolistID,
         idTask,

     }as const
   }

type addTaskACType= ReturnType<typeof addTaskAC >
export const addTaskAC = (todolistID:string,title:string) => {
    return{
        type:'ADDED-TASK',
        todolistID,
        title

    }as const
}

type changeTaskStatusACType= ReturnType<typeof changeTaskStatusAC >
export const changeTaskStatusAC = (todolistID:string,idTask:string,isDone:boolean) => {
    return{
        type:'CHANGE-ISDONE-TASK',
        todolistID,
        idTask,
        isDone

    }as const
}


type editTitleTaskType= ReturnType<typeof editTitleTaskAC >
export const editTitleTaskAC = (todolistID:string,idTask:string,text:string) => {
    return{
        type:"CHANGE-TITLE-TASK",
        todolistID,
        idTask,
        text

    }as const
}