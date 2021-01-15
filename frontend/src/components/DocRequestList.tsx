import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PatientNavBar from './PatientNavBar'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Checkbox, Grid, TextareaAutosize, TextField } from '@material-ui/core';
import { getPendingRequestList, postDoctorResponse } from '../remote/remote-functions';
import { useLocation } from 'react-router-dom';
import DoctorNavBar from './DoctorNavBar';
import { textChangeRangeIsUnchanged } from 'typescript';

interface IPatient{
    healthCardNumber:number,
    firstname:string,
    lastname:string
    email:string
    phone:string

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


export const DocRequestList:React.FunctionComponent<any> = () => {

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

    const [prescription,setPrescription] = useState<string>("");
    const [doctorresponse,setDocRes] = useState<string>("");
    const [hasappointment, setAppointment] = useState<boolean>(false);

    const handlePrescription=e=>{
        setPrescription(e.target.value);
      }

      const handleDocRes=e=>{        
        setDocRes(e.target.value);   
      }

      const handleAppointment = (event: any) => {
        setAppointment(true);
      };

   const postDocResponse=async(reqid)=>{       
        const docResponse={
             prescription,
             doctorresponse,
             requestId:reqid,
             hasappointment     
          }
       const data=await postDoctorResponse(docResponse);
        setPrescription("")
        setDocRes("")
        setExpanded(false)        
      }

    function getDoctorInfo(pinfo:IPatient){
        
        return(
            <>
            <b>Patient Details:</b><br/>
            
           Name: {pinfo.firstname} {pinfo.lastname}<br/>
           email: {pinfo.email} <br/>
           Phone: {pinfo.phone}
             
            </>
        )
    }

    async function getContent(){       
        let getReqList = await getPendingRequestList(location.state.doctorInfo.doctorId)
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
            
            <DoctorNavBar>
                {console.log(data[0] ? data[0].requestId: "")}
                <div className={classes.root}>
                
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                    
                    </Grid>
                    <Grid item xs={3}>Doctor Name: {data[0] ? data[0].doctorId.firstname : ""}</Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}></Grid>
                    {data.map(text => 
                        <Grid item xs={12}>                            
                            <Accordion expanded={expanded === `${text.requestId}`} onChange={handleChange(`${text.requestId}`)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    >
                                    <Typography className={classes.heading} >Reference number: {text.requestId}
                                    <input type='hidden' name="props.requestid" value={text.requestId} />
                                    </Typography>
                                    <Typography className={classes.secondaryHeading}>Status: {text.responsed ? "Resolved" : "Pending"}</Typography>
                                </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                     {getDoctorInfo(text.patientId)}<br/><br/>
                                    
                                     <b>Problem/Symptoms</b>: {text.problem}<br/><br/>
                                   
                                     <b>Medication:</b> <br/>   
                                        <TextField
                                                id="outlined-required"
                                                label="Medication details"
                                                value={prescription} onChange={handlePrescription}
                                                variant="outlined"
                                                style={{ width: 500}}
                                                />
                                    <br/>  <br/> 
                                    <b> Advice to patient: </b><br/>       
                                    <TextField
                                                id="outlined-required"
                                                label="Any Precautions"
                                                value={doctorresponse} onChange={handleDocRes}
                                                variant="outlined"
                                                style={{ width: 500}}
                                                />                                      
                                   
                                            <br/> <br/> 
                                           
                                    <b>Need Appointment:</b>
                                    <input
                                        type="checkbox"
                                        onChange={handleAppointment}
                                        />
                                       <br/>
                                    <Button variant="contained" color="primary" onClick={()=>postDocResponse(text.requestId)}>
                                        Submit
                                    </Button>                                                    
                                           
                                </Typography>
                            </AccordionDetails>
                            </Accordion>
                        </Grid>
                    )}
                                
                  </Grid>    
                </div>                
            </DoctorNavBar> 
        )
    
}
