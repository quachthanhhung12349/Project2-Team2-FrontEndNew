import React from 'react';
import { useLocation } from 'react-router-dom';
import {DoctorNavBar} from './DoctorNavBar'

export const Doctor: React.FunctionComponent = () => {
    const location: any = useLocation();
    return(
        <DoctorNavBar doctorInfo={location.state.patientInfo}>
           {location.state.doctorInfo.username}
        </DoctorNavBar>
    )
}

export default Doctor;