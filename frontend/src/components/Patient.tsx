import { Container } from '@material-ui/core';
import React from 'react';
import '../assets/patient.scss'


export const Patient: React.FunctionComponent = () => {
    return(
        <Container maxWidth="md">
            <div className="mainSection">
                <div className="clinicName">Revature Medical Clinic</div>
            </div>
        </Container>
    )
}