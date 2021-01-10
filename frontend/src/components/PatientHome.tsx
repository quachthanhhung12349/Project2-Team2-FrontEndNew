import { Container } from '@material-ui/core';
import { Router } from '@material-ui/icons';
import React from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import protectComponent from '../protected-route/UserAuthRoute'
import '../assets/patient.scss'
import { PatientNavBar } from './PatientNavBar';
import { RequestList } from './RequestList';



export const PatientHome: React.FunctionComponent = () => {
    return(
        <>
                <PatientNavBar>
                    <div>hiiiii</div>
                </PatientNavBar>

          </>  
        
    )
}

export default protectComponent(PatientHome)