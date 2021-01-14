import { Container } from '@material-ui/core';
import { Router } from '@material-ui/icons';
import React from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import '../assets/patient.scss'
import { DoctorNavBar } from './DoctorNavBar';
import { RequestList } from './RequestList';



export const DoctorHome: React.FunctionComponent = () => {
    return(
        <>
                <DoctorNavBar>
                    <div>Doctor Navbar Test</div>
                </DoctorNavBar>

          </>  
        
    )
}