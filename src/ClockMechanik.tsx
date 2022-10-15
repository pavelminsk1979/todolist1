import {useEffect, useState} from "react";
import React from "react";
import './ClockMechanik.css';

export const ClockMechanik = () => {

    const [date,setDate]=useState(new Date())

    useEffect(()=>{
        const interval2=setInterval(()=>{
            setDate(new Date())
        },1000);
        return()=>{
            clearInterval(interval2)
        }
    },[])


    const secondsStyle = {
        transform: `rotate(${date.getSeconds() * 6}deg)`
    };
    const minutesStyle = {
        transform: `rotate(${date.getMinutes() * 6}deg)`
    };
    const hoursStyle = {
        transform: `rotate(${date.getHours() * 30}deg)`
    };


    return (
        <div className={"clock"}>
           {/* <h3>Clock</h3>*/}
            <div className={"analog-clock"}>
                <div className={"dial seconds"} style={secondsStyle} />
                <div className={"dial minutes"} style={minutesStyle} />
                <div className={"dial hours"} style={hoursStyle} />
            </div>
           {/* <div className={"digital-clock"}></div>*/}
        </div>
    )
}