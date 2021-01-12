import React from 'react'
import PatientNavBar from './PatientNavBar'
import {Forum}  from './forum'


export const ForumList:React.FunctionComponent = () => {
    return(
        <PatientNavBar>
            <Forum />
        </PatientNavBar> 
    )
}