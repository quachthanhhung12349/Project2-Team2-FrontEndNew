import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PatientNavBar from './PatientNavBar'


interface IReqList{
    problem:string
}

export const RequestList:React.FunctionComponent<any> = () => {

    const [data, setRequestList] = useState<IReqList[]>([])

    useEffect(() => {
        axios.get<IReqList[]>("http://localhost:8080/patient/1").then(
            res =>{
                setRequestList(res.data)
                console.log(res.data);
                
            }
        )
    }, [])

    
        return(
            <PatientNavBar>
                <div>Get Request list
                <p>
                <ul>
                    { data.map(text => 
                     <li>{text.problem}</li>
                    )}
                </ul>
                </p>
                </div>
                
            </PatientNavBar> 
        )
    
}