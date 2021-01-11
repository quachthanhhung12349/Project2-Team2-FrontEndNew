import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PatientNavBar from './PatientNavBar'


interface IPatient{
    healthCardNumber:number,
    firstname:string
}

interface IReqList{
    patientId:IPatient,
    problem:string,
    responsed:boolean,
    timeStamp:string
}

export const RequestList:React.FunctionComponent<any> = () => {

    const [data, setRequestList] = useState<IReqList[]>([])
    const [pinfo, setPatientInfo] = useState<IPatient[]>([])
    

    useEffect(() => {
        axios.get<IReqList[]>("http://localhost:8080/patient/1").then(
            res =>{
                setRequestList(res.data)
                console.log(res.data);
                setPatientInfo(data.map(pi => pi.patientId))
            }
        )
        
    }, [])

    
        return(
            <PatientNavBar>
                <div>Get Request list
                <p>
                <ul>
                    {data.map(text => 
                     <li>{text.problem}, {String(text.responsed)}, 
                        </li>
                    )}
                    {pinfo.map(pi =>
                       <li>{String(pi.firstname )} 
                       </li> 
                    )}
                    
                </ul>
                </p>
                </div>
                
            </PatientNavBar> 
        )
    
}