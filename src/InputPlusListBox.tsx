
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from "./todolist.module.css";

export type InputPlusListBoxType={

    colback:(title: string)=>void
}
export function InputPlusListBox  (props:InputPlusListBoxType) {
    const [title, setTitle] = useState('')
    const [redMessage,setRedMessage]=useState<string|null>(null)


    const addedStateInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setRedMessage(null)
    }

    const onKeyPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addedTaskHandler()
        }
    }

    const addedTaskHandler = () => {
        if(title.trim()!==''){
            props.colback(title.trim())
        }else{
            setRedMessage('Title is required')
        }
        setTitle('')
    }



    return(
        <div>
            <input
                className={redMessage ? style.redFrame:style.input}
                   onKeyPress={onKeyPressEnterHandler}
                   value={title}
                   onChange={addedStateInputHandler}
            />
            <button
                onClick={addedTaskHandler}
            >+
            </button>
            {redMessage&&<div className={style.redMessage}>{redMessage} </div>}
        </div>
    )
}