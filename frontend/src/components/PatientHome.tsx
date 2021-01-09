import { Container } from '@material-ui/core';
import { Router } from '@material-ui/icons';
import React from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import '../assets/patient.scss'
import PersistentDrawerLeft from './PersistentDrawerLeft';
import { RequestList } from './RequestList';



export const PatientHome: React.FunctionComponent = () => {
    return(
        <>
                <PersistentDrawerLeft>
                    <div>hiiiii</div>
                </PersistentDrawerLeft>

          </>  
        
    )
}