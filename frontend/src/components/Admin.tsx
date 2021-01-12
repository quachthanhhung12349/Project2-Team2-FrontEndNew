import React from 'react';
import { useLocation } from 'react-router-dom';

export const Admin: React.FunctionComponent = () => {
    const location: any = useLocation();
    return(
        <h1>{location.state.adminInfo.username}</h1>
    )
}
export default Admin;