import React from 'react';
import protectComponent from '../protected-route/UserAuthRoute'

export const Admin: React.FunctionComponent = () => {
    return(
       <h1>Admin</h1>
    )
}

export default protectComponent(Admin)