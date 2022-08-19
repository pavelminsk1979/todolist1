import {v1} from "uuid";
import {
    AddedTodolistAC,
    ChangeFilterTodolistAC,
    ChangeTitleTodolistAC,
    RemoveTodolistAC,
    todolistReduser
} from "./todolistReducer";
import {FilterType, StateTodolistType} from "../AppWithReduser";

test('correct todolist should be removed',()=> {
    const todolist1 = v1()
    const todolist2 = v1()

    const startState: Array<StateTodolistType> = [
        {id: todolist1, title: 'What to buy', filter: 'all'},
        {id: todolist2, title: 'What to learn', filter: 'all'}]

    const endState=todolistReduser(startState,RemoveTodolistAC(todolist1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolist2)
})


test('correct todolist should be added',()=> {
    const todolist1 = v1()
    const todolist2 = v1()
let newTodolistTitle='New Todolist'
    const startState: Array<StateTodolistType> = [
        {id: todolist1, title: 'What to buy', filter: 'all'},
        {id: todolist2, title: 'What to learn', filter: 'all'}]

    const endState=todolistReduser(startState,AddedTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New Todolist')
})

test('correct todolist should change is name',()=> {
    const todolist1 = v1()
    const todolist2 = v1()
    let newTodolistTitle='New Todolist'
    const startState: Array<StateTodolistType> = [
        {id: todolist1, title: 'What to buy', filter: 'all'},
        {id: todolist2, title: 'What to learn', filter: 'all'}]

    const endState=todolistReduser(startState,ChangeTitleTodolistAC(
        todolist2, newTodolistTitle))
    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe('New Todolist')
    expect(endState[0].title).toBe('What to buy')
})

test('correct filter of todolist should be change ',()=> {
    const todolist1 = v1()
    const todolist2 = v1()
    let newFilter:FilterType='yes'

    const startState: Array<StateTodolistType> = [
        {id: todolist1, title: 'What to buy', filter: 'all'},
        {id: todolist2, title: 'What to learn', filter: 'all'}]

    const endState=todolistReduser(startState,ChangeFilterTodolistAC(
        todolist2,newFilter
    ))
    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe(newFilter)
    expect(endState[0].filter).toBe('all')
})