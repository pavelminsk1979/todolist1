

import {tasksReducer} from "../Reducer/tasksReduser";
import {todolistReduser} from "../Reducer/todolistReducer";
import {combineReducers,  legacy_createStore} from "redux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReduser
})


export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store=store