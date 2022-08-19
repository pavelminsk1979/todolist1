import {FilterType, StateTodolistType} from "../App";
import {v1} from "uuid";

export type AllType=ActionREMOVEType|ActionAddedType|ActionChangeTileTodolist|ActionChangeFilterTodolist

type ActionChangeTileTodolist={
   type: 'CHANGE-TITLE-TODOLIST'
    title:string
    id:string
}

type ActionChangeFilterTodolist={
    type:'CHANGE-FILTER-TODOLIST'
    filter:FilterType
    id:string
}

export const todolistReduser = (state:Array<StateTodolistType>,action:AllType):Array<StateTodolistType> => {
  switch (action.type){
      case 'REMOVE-TODOLIST':{
          return state.filter(e=>e.id!==action.id)
      }
      case 'ADDED-TODOLIST':{

          return [...state,{id: action.newTodolistID, title: action.title, filter: 'all'}]
      }
      case "CHANGE-TITLE-TODOLIST":{
          return state.map(e=>e.id===action.id?{...e,title:action.title}:e)
      }
      case "CHANGE-FILTER-TODOLIST":{
          return state.map(e=>e.id===action.id?{...e,filter:action.filter}:e)
      }
      default:return state
  }
}
type ActionREMOVEType=ReturnType<typeof RemoveTodolistAC>

export const RemoveTodolistAC = (id:string) => {
  return{
      type:'REMOVE-TODOLIST',
      id:id
  }as const
}
 export type ActionAddedType=ReturnType<typeof AddedTodolistAC>
export const AddedTodolistAC = (title:string) => {
  return{
      type:'ADDED-TODOLIST',
      title:title,
      newTodolistID: v1()
  }as const
}