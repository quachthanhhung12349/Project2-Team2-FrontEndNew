import { Container } from '@material-ui/core';
import React from 'react';
import '../assets/patient.scss'
import { Register } from './Register';
import { Admin } from './Admin';
import { Doctor } from './Doctor';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import PersistentDrawerLeft from './PersistentDrawerLeft';



export const Patient: React.FunctionComponent = () => {
    return(
        <Container maxWidth="md">
            <PersistentDrawerLeft>
                <div>hiiiii</div>
            </PersistentDrawerLeft>
            
        </Container>
    )
}