import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PatientNavBar from './PatientNavBar'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';
import { getRequestList } from '../remote/remote-functions';
import { useLocation } from 'react-router-dom';

interface IPatient{
    healthCardNumber:number,
    firstname:string,

}

interface IDoctor{
    firstname:string
    lastname:string
    email:string
    phone:string
}
interface IReqList{
    patientId:IPatient,
    doctorId:IDoctor,
    problem:string,
    responsed:boolean,
    timeStamp:string,
    requestId:number
    prescription:string
}



export const RequestList:React.FunctionComponent<any> = () => {

    const [data, setRequestList] = useState<IReqList[]>([])
    const location: any = useLocation()

    const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginLeft: '5%',
            marginRight: '5%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
    )

    function getDoctorInfo(dinfo:IDoctor){

        return(
            <>
            <h4>Doctor's Response:</h4>
            
            Doctor's name: {dinfo.firstname} {dinfo.lastname}<br/>
            Doctor's contact information: {dinfo.email}, phone: {dinfo.phone}
             
            </>
        )
    }

    async function getContent(){
        console.log(location.state.patientInfo.patientId)
        let getReqList = await getRequestList(location.state.patientInfo.patientId)
        setRequestList(getReqList)
    } 

    useEffect(() => {
        getContent()
    }, [])

    
        const classes = useStyles();
        const [expanded, setExpanded] = React.useState<string | false>(false);
      
        const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
          setExpanded(isExpanded ? panel : false);
        }
      

        return(
            
            <PatientNavBar>
 
                <div className={classes.root}>
                
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                    
                    </Grid>
                    <Grid item xs={3}>{data[0] ? data[0].patientId.firstname : ""}</Grid>
                    <Grid item xs={3}>HCN:</Grid>
                    <Grid item xs={3}></Grid>
                    {data.map(text => 
                        <Grid item xs={12}>
                            <Accordion expanded={expanded === `${text.requestId}`} onChange={handleChange(`${text.requestId}`)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    >
                                    <Typography className={classes.heading}>Reference number: {text.requestId}</Typography>
                                    <Typography className={classes.secondaryHeading}>Status: {text.responsed ? "Resolved" : "Pending"}</Typography>
                                </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <h4>Request Information:</h4>
                                    Problem/Symptoms: {text.problem}<br/>
                                    {text.doctorId ? getDoctorInfo(text.doctorId) : "no doctor"}
                                </Typography>
                            </AccordionDetails>
                            </Accordion>
                        </Grid>
                    )}
                                
                  </Grid>    
                </div>
                
            </PatientNavBar> 
        )
    
}
