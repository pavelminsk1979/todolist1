import {useEffect, useState} from "react";
import React from "react";

export const Clock = () => {
    const [number, setNumber] = useState(1)

    useEffect(() => {
        const inteval1=setInterval(() => {
            setNumber(state => state + 1)
        }, 1500);
        return()=>{
            clearInterval(inteval1) /*этим ретурном остановится работа СЕТИНТЕРВАЛА...
             когда компанента демонтируется-останавливается работа БРАУЗЕРНОЙ ФУНКЦИИ setInterval*/
        }
    },[])


    const [date,setDate]=useState(new Date())
    useEffect(()=>{
       const interval2=setInterval(()=>{
            setDate(new Date())
        },1000);
       return()=>{
           clearInterval(interval2)
       }
    },[])

   /* если секунд или минут или часов меньше 10 я добавлю ноль перед цифрой*/
    const addedNulSeconds=date.getSeconds()<10
        ? '0'+date.getSeconds()
        : date.getSeconds()

    const addedNulMinutes=date.getMinutes()<10
        ? '0'+date.getMinutes()
        : date.getMinutes()

    const addedNulHours=date.getHours()<10
        ? '0'+date.getHours()
        : date.getHours()

    return (
        <div>
            <div>
                это уже получается у нас сечас {number} овечек?
            </div>
            <span>{addedNulHours}</span>
            :
            <span>{addedNulMinutes}</span>
            :
            <span>{addedNulSeconds}</span>
        </div>
    )
}