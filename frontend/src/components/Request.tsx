import React, { useEffect, useState } from 'react';
import PatientNavBar from './PatientNavBar';
import { getDoctorList, postPatientRequest } from '../remote/remote-functions';
import { Accordion, AccordionDetails, AccordionSummary, Button, createStyles, Grid, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useLocation } from 'react-router';

export const Request: React.FunctionComponent<any> = () => {

    const [docList, setDocList]  = useState<any>([])
    const [problem, setProblem] = useState<any>()
    const [error, setError] = useState<any>("")
    const location: any = useLocation()

    async function getDocList(){
        let doctors = await getDoctorList()
        setDocList(doctors)
    }

    async function submitRequest(docid:number, patientProblem:string){
        let reqData = {
            doctorId:docid,
            problem: patientProblem,
            patientId: location.state.patientInfo.patientId  
        }
        if(patientProblem === "" || patientProblem === undefined){
            setError("Please enter your problems/Symptoms")
        }else{
            let res = await postPatientRequest(reqData)
            setProblem("")
            setError("")
        }
        
    }

    function handleChangeProblem(event:any){
        setProblem(event.target.value)
    }

    useEffect(() => {
        getDocList()
    }, [])

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
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            
        },
        accordionBackground: {
            backgroundColor: "#EDF2FB"
        },
        rootButton: {
            '&:hover': {
                backgroundColor: "#014F86",
            },
            background: "#012A4A",
            borderRadius: 3,
            border: 0,
            color: 'white',
            fontWeight: 'bold',
            height: 40,
            boxShadow: '0 3px 5px 2px rgba(120, 154, 188, 0.3)',
            marginTop: 15
        },
        accordionHeading: {
            color: "#012A4A"
        },
        textbox: {
            width: "100% important!" 
        }
    }),
    )

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);
      
    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    }


    return(
        <PatientNavBar>
            <div className={classes.root} >
            {console.log(docList)}
            <Grid container spacing={2}>
                {docList.map(elem =>
                    <Grid item xs={12}>
                        <Accordion className={classes.accordionBackground} expanded={expanded === `${elem.doctorId}`} onChange={handleChange(`${elem.doctorId}`)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                >
                                <Typography className={classes.heading}>Dr. {elem.firstname} {elem.lastname}</Typography>
                                <Typography> </Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Typography>
                                    <h4 className={classes.accordionHeading}>Doctor information</h4>
                                        Email: {elem.email}<br/>
                                        Address: {elem.address}<br/>
                                        Gender: {elem.gender}<br/>
                                        Languages spoken: {elem.language} 
                                    <h4 className={classes.accordionHeading}>Doctor Background</h4>
                                        Speciality: {elem.speciality}<br/>
                                        Education: {elem.education}<br/>
                                        Certification: {elem.certification}<br/>
                                        Awards: {elem.awards}
                                    <h4 className={classes.accordionHeading}>Create Request</h4>
                                    
                                    <Grid item xs={12}>
                                        Problem:
                                    <TextField
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        variant="outlined"
                                        onChange={handleChangeProblem}
                                        className={classes.textbox}
                                        />
                                        {error}
                                    </Grid>
                                    <Grid item xs={12}>
                                    <Button variant="contained" onClick={() => submitRequest(elem.doctorId, problem)} classes={{
                                        root: classes.rootButton,
                                    }}>Create Request</Button>
                                    </Grid>
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