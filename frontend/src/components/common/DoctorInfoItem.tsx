import React from 'react';
import { Paper, Grid, Chip, Avatar, InputLabel, Button, Tooltip, IconButton } from '@material-ui/core';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { updateStatus } from '../../remote/remote-functions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paperItem: {
            '&:hover': {
                backgroundColor: '#0262a6',
            },
            marginTop: 10,
            padding: 5,
            fontSize: 22,
            backgroundColor: '#014F86',
            color: 'white',
        },
        ApproveButton: {
            '&:hover': {
                color: '#4BB543',
            },
            color: "white",
        },
        DenyButton: {
            '&:hover': {
                color: '#DC143C',
            },
            color: "white",
        },
        rootButton: {
            '&:hover': {
                backgroundColor: "#014F86",
            },
            background: "#012A4A",
            border: 0,
            color: 'white',
            fontWeight: 'bold',
            height: 40,
            boxShadow: '0 3px 5px 2px rgba(120, 154, 188, 0.3)'
        },
    })
);




export const DoctorInfoItem: React.FunctionComponent<any> = (props: any) => {
    const classes = useStyles();

    const item = props.item;
    console.log(item)


    const statusColor = (status) => {
        switch (status) {
            case 'Approved':
                return <Chip style={{ backgroundColor: '#4BB543', color: 'white', width: '5rem' }} label='Approved' />;
            case 'Rejected':
                return <Chip style={{ backgroundColor: '#DC143C', color: 'white', width: '5rem' }} label='Rejected' />;
            case 'Pending':
                return <Chip style={{ backgroundColor: '#e0e0e0', color: '#012A4A', width: '5rem' }} label='Pending' />;
        }
    }

    const onSubmit = async (doctorId, status) => {
        try {
            let res = await updateStatus(doctorId, status)
            console.log("in Item")
            props.handleChange();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Paper elevation={1} classes={{ root: classes.paperItem }}>
                <Grid container spacing={1}>
                    <Grid item xs={3} style={{ marginTop: 8, marginLeft: 10 }}>
                        {statusColor(item.status)}
                    </Grid>
                    <Grid item xs style={{ marginTop: 8 }}>
                        <Chip avatar={<Avatar style={{ backgroundColor: '#014F86', color: 'white' }}>ID</Avatar>} label={item.doctorId} style={{ fontSize: 20 }} />
                    </Grid>
                    <Grid item xs={6} style={{ marginTop: 8 }}>
                        {item.firstname} {item.lastname}
                    </Grid>
                    <Grid>
                        <Tooltip title="Approved">
                            <span>
                            <IconButton
                                onClick={() => onSubmit(item.doctorId, "Approved")}
                                disabled={item.status === 'Approved'}
                                classes={{
                                    root: classes.ApproveButton,
                                }}>
                                <ThumbUpIcon style={{ fontSize: 35 }} />
                            </IconButton>
                            </span>
                        </Tooltip>
                    </Grid>
                    <Grid>
                        <Tooltip title="Reject">
                            <IconButton
                                onClick={() => onSubmit(item.doctorId, "Rejected")}
                                disabled={item.status === 'Rejected'}
                                classes={{
                                    root: classes.DenyButton,
                                }}>
                                <ThumbDownIcon style={{ fontSize: 35 }} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>


            </Paper>
        </>
    );
}