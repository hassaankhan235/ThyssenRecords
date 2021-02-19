import React from 'react'
import { gql, useQuery } from '@apollo/client'

import DashboardInfoCards from './DashboardInfoCards'

const AppLogedin = () => {  
    
    const READ_QUERY = gql`
    {
        message
    }
    `;

    const {loading, error, data} = useQuery(READ_QUERY)
    console.log("DATA IS", data, error);
return(
    <div>
        Hassaan
        {loading && `Still Loading baba`}
        {data && data.message}
        {error && `ERROR HAI`}
        <DashboardInfoCards />
    </div>
)
}

export default AppLogedin