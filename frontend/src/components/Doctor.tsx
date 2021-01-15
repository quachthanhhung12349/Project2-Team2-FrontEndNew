import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IconButton, Tooltip, Paper, Grid, InputLabel, TextField, RadioGroup, FormControlLabel, Radio, Button, Select, MenuItem } from '@material-ui/core';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import DoctorNavBar from './DoctorNavBar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '&$underline': {
                borderBottom: '0',
            },
        },
        underline: {
            '&:after': {
                borderBottom: '2px solid #012A4A',
            },
        },
        backButton: {
            '&:hover': {
                color: '#014F86',
            },
            color: "#012A4A",
            backgroundColor: "#EDF2FB",
            position: 'absolute',
            top: 5,
            left: 5,
        },
        paper: {
            padding: '2rem',
            margin: 'auto',
            width: '84%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: "#EDF2FB",
        },
        rootButton: {
            '&:hover': {
                backgroundColor: "#014F86",
            },
            background: "#012A4A",
            borderRadius: "2rem",
            border: 0,
            color: 'white',
            fontWeight: 'bold',
            height: 40,
            boxShadow: '0 3px 5px 2px rgba(120, 154, 188, 0.3)',
            width: '20%',
            float: 'right'
        },
    })
);

export const Doctor: React.FunctionComponent = (props) => {
    const location: any = useLocation();

    const history = useHistory();
    const classes = useStyles();

    return (
        <DoctorNavBar>
        <div>
            <h2 id="registerationTitle">Doctor Details</h2>
            <Paper elevation={3} classes={{ root: classes.paper }}>
                <Grid container spacing={3} >
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}> First Name </InputLabel>
                        <TextField
                            id="filled-required"
                            value={location.state.doctorInfo.firstname}
                            variant="filled"
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}> Last Name </InputLabel>
                        <TextField
                            id="filled-required"
                            value={location.state.doctorInfo.lastname}
                            variant="filled"
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}> Age </InputLabel>
                        <TextField
                            id="filled-required"
                            value={location.state.doctorInfo.age}
                            variant="filled"
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}> Gender </InputLabel>
                        <TextField
                            id="filled-required"
                            value={location.state.doctorInfo.gender}
                            variant="filled"
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}> Phone Number</InputLabel>
                        <TextField
                            id="filled-required"
                            value={location.state.doctorInfo.phone}
                            variant="filled"
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}> Email Address</InputLabel>
                        <TextField
                            id="filled-required"
                            value={location.state.doctorInfo.email}
                            variant="filled"
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}> Residential Address </InputLabel>
                        <TextField
                            id="filled-required"
                            value={location.state.doctorInfo.address}
                            variant="filled"
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}> Education </InputLabel>
                        <TextField
                            id="filled-required"
                            value={location.state.doctorInfo.education}
                            variant="filled"
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}> Certifications </InputLabel>
                        <TextField
                            id="filled-required"
                            value={location.state.doctorInfo.certification}
                            variant="filled"
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}> Awards </InputLabel>
                        <TextField
                            id="filled-required"
                            value={location.state.doctorInfo.awards}
                            variant="filled"
                            />
                    </Grid>
                   
                </Grid>
            </Paper>
        </div>
       </DoctorNavBar>
    );

    return(
        <DoctorNavBar doctorInfo={location.state.doctorInfo}>
           {location.state.doctorInfo.username}
        </DoctorNavBar>
    )

}

export default Doctor;