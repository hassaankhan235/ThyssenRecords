import React from 'react'
import { gql, useQuery } from '@apollo/client'

import DashboardInfoCards from './components/DashboardInfoCards'
import Styles from './components/Dash.module.css'
import DashboardFootCard from './components/DashboardFootCard'


const AppLogedin = () => {  
    
    const READ_QUERY = gql`
    {
        message
    }
    `;

    const {loading, error, data} = useQuery(READ_QUERY)
    console.log("DATA IS", data, error);
return(
    <>
    <div className= {`bg-secondary ${Styles.grid}`} style={{ width:'80%', margin:'0 auto'}}>
        <div style={{display:'flex', flexDirection:'column'}}>
        Hassaan
        {loading && `Still Loading baba`}
        {data && 'THIS MONTH'}
        {error && `ERROR HAI`}
        <div style={{display:'flex'}}>
        <DashboardInfoCards title='ToolBox Talk' firstinfo='Total tbts' secinfo='Total Attendees'/>
        <DashboardInfoCards title='Training' firstinfo='Tot Traing' secinfo='Total Attendees'/>
        </div>
        </div>

        <div className='ml-5' style={{display:'flex', flexDirection:'column'}}>
            This Year
        <div style={{display:'flex'}}>
        <DashboardInfoCards title='ToolBox Talk' firstinfo='Total tbts' secinfo='Total Attendees'/>
        <DashboardInfoCards title='Training' firstinfo='Tot Traing' secinfo='Total Attendees'/>
        </div>
        </div>
    </div>
        <DashboardFootCard />
    </>
)
}

export default AppLogedin