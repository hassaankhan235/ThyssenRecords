import React from 'react'
import { gql, useQuery } from '@apollo/client'

import DashboardInfoCards from './DashboardInfoCards'
import Styles from './Dash.module.css'
import DashboardFootCard from './DashboardFootCard'
import Loader from '../../../Components/loader'


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
        SumOfNiTechnician
    }
    `;

    

const {loading, error, data} = useQuery(READ_QUERY)

if(error) return "error"
console.log('NItotAttendeesMonth', data); 


return(
    <>
    <div className= {`bg-secondary ${Styles.grid}`} style={{ width:'80%', margin:'0 auto'}}>
        <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
        <h5 className='text-light card' style={{width:'100%'}}> 
        {loading && `Still Loading baba`}
        {data && <span className={`${Styles.periodHeading}`}> THIS MONTH </span>}
        {error && `ERROR HAI`}
        </h5>
        <div style={{display:'flex'}}>
        <DashboardInfoCards title='ToolBox Talk' firstinfo='Total tbts' firsttotal={data && data.NItotTBTMonth} 
        secondtotal={data && data.NItotAttendeesMonth} secinfo='Total Attendees' thirdtotal={data && data.SERtotTBTMonth}
        fourthtotal= {data && data.SERtotAttendeesMonth} />
        <DashboardInfoCards title='Safety Alert' firstinfo='Tot Traing'  secinfo='Total Attendees' firsttotal={0}
        secondtotal={0} thirdtotal={0} fourthtotal={0}/>
        </div>
        </div>

        <div className='ml-5' style={{display:'flex', flexDirection:'column'}}>
        <h5 className='text-light card'>   
        <span className={`${Styles.periodHeading}`}> THIS YEAR </span> 
        </h5> 
        <div style={{display:'flex'}}>
        <DashboardInfoCards title='ToolBox Talk' firstinfo='Total tbts' secinfo='Total Attendees'
        firsttotal={data && data.NItotTBTYear} secondtotal= {data && data.NItotAttendeesYear}
        thirdtotal={data && data.SERtotTBTYear} fourthtotal={data && data.SERtotAttendeesYear} />
        <DashboardInfoCards title='Safety Alert' firstinfo='Tot Traing' secinfo='Total Attendees' firsttotal={0}
        secondtotal={0} thirdtotal={0} fourthtotal={0}/>
        </div>
        </div>
    </div>
        <DashboardFootCard SumNiTech={data && data.SumOfNiTechnician} />

    </>
)
}

export default AppLogedin