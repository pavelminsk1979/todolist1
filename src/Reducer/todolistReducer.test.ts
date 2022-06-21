import {v1} from "uuid";
import {FilterType, StateTodolistType} from "../App";
import {AddedTodolistAC, RemoveTodolistAC, todolistReduser} from "./todolistReducer";

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

    const endState=todolistReduser(startState,{
        type:'CHANGE-TITLE-TODOLIST',title:newTodolistTitle,id:todolist2})
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

    const endState=todolistReduser(startState,{
        type:'CHANGE-FILTER-TODOLIST',filter:newFilter,id:todolist2})
    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe(newFilter)
    expect(endState[0].filter).toBe('all')
})