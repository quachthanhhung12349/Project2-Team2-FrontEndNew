import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PatientNavBar from './PatientNavBar'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface IPatient{
    healthCardNumber:number,
    firstname:string
}

interface IReqList{
    patientId:IPatient,
    problem:string,
    responsed:boolean,
    timeStamp:string,
    requestId:number
}



export const RequestList:React.FunctionComponent<any> = () => {

    const [data, setRequestList] = useState<IReqList[]>([])
    const [pinfo, setPatientInfo] = useState<IPatient[]>([])
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
    }),
    )



    useEffect(() => {
        axios.get("http://localhost:8080/patient/1").then(
            res =>{
                setRequestList(res.data)
                console.log(res.data);
                setPatientInfo(data.map(pi => pi.patientId))
            }
        )
        
    }, [])

    
        const classes = useStyles();
        const [expanded, setExpanded] = React.useState<string | false>(false);
      
        const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
          setExpanded(isExpanded ? panel : false);
        }
      
    
        return(
            
            <PatientNavBar>
 
                <div className={classes.root}>
                    {data.map(text => 
                     <Accordion expanded={expanded === `${text.requestId}`} onChange={handleChange(`${text.requestId}`)}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>Reference numner: {text.requestId}</Typography>
                            <Typography className={classes.secondaryHeading}>Status: {text.responsed ? "Resolved" : "Pending"}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {text.problem}
                            </Typography>
                        </AccordionDetails>
                     </Accordion>
                    )}
                  
                    
                    
                </div>
                
            </PatientNavBar> 
        )
    
}
