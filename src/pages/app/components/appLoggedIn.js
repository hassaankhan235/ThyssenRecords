import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

import DashboardInfoCards from './DashboardInfoCards'
import Styles from './Dash.module.css'
import DashboardFootCard from './DashboardFootCard'


const AppLogedin = () => {  
    
    const READ_QUERY = gql`
    {
        NItotTBTMonth
        NItotAttendeesMonth
        NItotTBTYear
        NItotAttendeesYear
        SERtotTBTMonth
        SERtotAttendeesMonth
        SERtotAttendeesYear
        SERtotTBTYear
    }
    `;

    

const {loading, error, data} = useQuery(READ_QUERY)
console.log('NItotAttendeesMonth', data); 


return(
    <>
    <div className= {`bg-secondary ${Styles.grid}`} style={{ width:'80%', margin:'0 auto'}}>
        <div style={{display:'flex', flexDirection:'column'}}>
        <h5 className='text-light'> 
        {loading && `Still Loading baba`}
        {data && 'THIS MONTH'}
        {error && `ERROR HAI`}
        </h5>
        <div style={{display:'flex'}}>
        <DashboardInfoCards title='ToolBox Talk' firstinfo='Total tbts' firsttotal={data && data.NItotTBTMonth} 
        secondtotal={data && data.NItotAttendeesMonth} secinfo='Total Attendees' thirdtotal={data && data.SERtotTBTMonth}
        fourthtotal= {data && data.SERtotAttendeesMonth} />
        <DashboardInfoCards title='Training' firstinfo='Tot Traing'  secinfo='Total Attendees'/>
        </div>
        </div>

        <div className='ml-5' style={{display:'flex', flexDirection:'column'}}>
        <h5 className='text-light'>     THIS YEAR </h5> 
        <div style={{display:'flex'}}>
        <DashboardInfoCards title='ToolBox Talk' firstinfo='Total tbts' secinfo='Total Attendees'
        firsttotal={data && data.NItotTBTYear} secondtotal= {data && data.NItotAttendeesYear}
        thirdtotal={data && data.SERtotTBTYear} fourthtotal={data && data.SERtotAttendeesYear} />
        <DashboardInfoCards title='Training' firstinfo='Tot Traing' secinfo='Total Attendees'/>
        </div>
        </div>
    </div>
        <DashboardFootCard />

    </>
)
}

export default AppLogedin