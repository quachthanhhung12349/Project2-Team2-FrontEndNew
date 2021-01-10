import React from 'react';
import protectComponent from '../protected-route/UserAuthRoute'

export const Doctor: React.FunctionComponent = () => {
    return(
       <h1>Doctor</h1>
    )
}
export default protectComponent(Doctor)