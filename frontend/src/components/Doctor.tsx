import React from 'react';
import { useLocation } from 'react-router-dom';

export const Doctor: React.FunctionComponent = () => {
    const location: any = useLocation();
    return(
       <h1>{location.state.doctorInfo.username}</h1>
    )
}

export default Doctor;