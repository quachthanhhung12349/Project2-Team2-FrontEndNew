import React from 'react';
import '../assets/patient.scss'
import { PatientNavBar } from './PatientNavBar';
import { RequestList } from './RequestList';
import { useLocation } from 'react-router-dom';



export const PatientHome: React.FunctionComponent = () => {
    const location: any = useLocation();
    return(
        <>
                <PatientNavBar>
                    <div>{location.state.patientInfo.username}</div>
                </PatientNavBar>

          </>  
        
    )
}

export default PatientHome;