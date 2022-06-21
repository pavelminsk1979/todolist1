import React, {ChangeEvent, useState} from "react";


export type EditHeaderTitleType = {
    text: string
    colback: (text: string) => void
}

export function EditHeaderTitle(props: EditHeaderTitleType) {
    const [onInput, setOnInput] = useState(false)
    const [stateEditText, setStateEditText] = useState(props.text)

    const onDoubleClickHandler = () => {
        setOnInput(true)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStateEditText(e.currentTarget.value)

    }
    const onBlurHandler = () => {
        props.colback(stateEditText)
        setOnInput(false)
    }

    return (
        onInput
            ? <input
                autoFocus
                onBlur={onBlurHandler}
                onChange={onChangeHandler}
                value={stateEditText}/>

            : <span
                onDoubleClick={onDoubleClickHandler}
            >{props.text}</span>
    )
}