import React from 'react'
import { gql, useQuery } from '@apollo/client'

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
        SumOfNiTechnician
        SumOfSerTechnician
        SERtotSAMonth
        SERtotAttendeesMonth_SA
        NItotSAMonth
        NItotAttendeesMonth_SA
        NItotAttendeesYear_SA
        NItotSAYear
    }
    `;

    

const {loading, error, data} = useQuery(READ_QUERY)

if(error) return "error"
if(loading) console.log('LOADING ABHI')
console.log('NItotAttendeesMonth', data, error); 


return(
    <div className={'flex flex-column'} style={{ width:'100%', margin:'0 auto'}}>
    <div className= {` ${Styles.mycontainer} `} >
        <div className={`${Styles.blockone}`} >
        <h5 className={`${Styles.periodHeading} card`}> 
        {loading && `Still Loading baba`}
        {data &&  'THIS MONTH' }
        {error && `ERROR HAI`}
        </h5>
        <div style={{display:'flex'}}>
        <DashboardInfoCards title='ToolBox Talk' firstinfo='Total tbts' firsttotal={data && data.NItotTBTMonth} 
        secondtotal={data && data.NItotAttendeesMonth} secinfo='Total Attendees' thirdtotal={data && data.SERtotTBTMonth}
        fourthtotal= {data && data.SERtotAttendeesMonth} />
        <DashboardInfoCards title='Safety Alert' firstinfo='Tot Traing'  secinfo='Total Attendees' firsttotal={data && data.NItotSAMonth}
        secondtotal={data && data.NItotAttendeesMonth_SA} thirdtotal={data && data.SERtotSAMonth} 
        fourthtotal={data && data.SERtotAttendeesMonth_SA}/>
        </div>
        </div>

        <div className={`${Styles.blocktwo}`} style={{width:'100%'}}>
        <h5 className={`${Styles.periodHeading} `} >   
        THIS YEAR  
        </h5> 
        <div style={{display:'flex'}}>
        <DashboardInfoCards title='ToolBox Talk' firstinfo='Total tbts' secinfo='Total Attendees'
        firsttotal={data && data.NItotTBTYear} secondtotal= {data && data.NItotAttendeesYear}
        thirdtotal={data && data.SERtotTBTYear} fourthtotal={data && data.SERtotAttendeesYear} />
        <DashboardInfoCards title='Safety Alert' firstinfo='Tot Traing' secinfo='Total Attendees' 
        firsttotal={data && data.NItotSAYear}
        secondtotal={data && data.NItotAttendeesYear_SA} thirdtotal={0} fourthtotal={0}/>
        </div>
        </div>
    </div>
        <DashboardFootCard SumNiTech={data && data.SumOfNiTechnician} SumSerTech={data && data.SumOfSerTechnician} />

    </div>
)
}

export default AppLogedin