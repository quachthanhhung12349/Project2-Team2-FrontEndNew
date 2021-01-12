import { Container } from '@material-ui/core';
import { Router } from '@material-ui/icons';
import React from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
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