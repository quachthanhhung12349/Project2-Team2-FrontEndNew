import React from 'react';
import '../assets/patient.scss'
import { PatientNavBar } from './PatientNavBar';
import { RequestList } from './RequestList';
import { useLocation } from 'react-router-dom';



export const PatientHome: React.FunctionComponent<any> = () => {
    const location: any = useLocation();
    const {patientInfo} = location.state;
    return(
        <>
                <PatientNavBar patientInfo={location.state.patientInfo}>
                    <div>{location.state.patientInfo.patientId}</div>
                </PatientNavBar>

          </>  
        
    )
}

export default PatientHome;