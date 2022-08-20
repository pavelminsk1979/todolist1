import {v1} from "uuid";
import {FilterType, StateTodolistType} from "../AppWithRedux";


export type AllType = ActionREMOVEType | ActionAddedType | ChangeTitleTodolistType | ChangeFilterTodolistType

const initialStateTodolist:Array<StateTodolistType>=[]

export const todolistReduser = (
    state: Array<StateTodolistType>=initialStateTodolist, action: AllType): Array<StateTodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(e => e.id !== action.id)
        }
        case 'ADDED-TODOLIST': {

            return [...state, {id: action.newTodolistID, title: action.title, filter: 'all'}]
        }
        case "CHANGE-TITLE-TODOLIST": {
            return state.map(e => e.id === action.todolistID ? {...e, title: action.text} : e)
        }
        case "CHANGE-FILTER-TODOLIST": {
            return state.map(
                e => e.id === action.todolistID ? {...e, filter: action.valueFilter} : e)
        }
        default:
            return state
    }
}
type ActionREMOVEType = ReturnType<typeof RemoveTodolistAC>

export const RemoveTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: id
    } as const
}

export type ActionAddedType = ReturnType<typeof AddedTodolistAC>
export const AddedTodolistAC = (title: string) => {
    return {
        type: 'ADDED-TODOLIST',
        title: title,
        newTodolistID: v1()
    } as const
}

export type ChangeTitleTodolistType = ReturnType<typeof ChangeTitleTodolistAC>
export const ChangeTitleTodolistAC = (todolistID: string, text: string) => {
    return {
        type: "CHANGE-TITLE-TODOLIST",
        todolistID,
        text
    } as const
}

export type ChangeFilterTodolistType = ReturnType<typeof ChangeFilterTodolistAC>
export const ChangeFilterTodolistAC = (todolistID: string, valueFilter: FilterType) => {
    return {
            type: 'CHANGE-FILTER-TODOLIST',
        todolistID,
        valueFilter
        }as const
    }
