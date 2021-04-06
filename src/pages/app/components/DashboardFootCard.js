import React from 'react'
import { gql, useQuery } from '@apollo/client'

import Styles from './dashFoot.module.css'
import Style from './Dash.module.css'
import Loader from '../../../Components/loader'


function DashboardFootCard(props) {

  const {SumNiTech} = props
  
    return (
        <div className={`${Styles.footer} `}>
             <div className='card' >
             <div class="card-body">
    <ul className= {`list-group d-flex flex-row justify-content-center` } >
  <li className=  {`list-group-item  ${Style.textyellow} ${Style.flex} 
  ${Style.borderYellow} ${Style.small} mr-5`} style={{width: "20%"}} > 
  NI technicians  
  <p className={Style.info}> {!SumNiTech? <Loader /> : SumNiTech} </p>   
  </li>
  
  <li className=  {`list-group-item  ${Style.textyellow} ${Style.flex} 
  ${Style.borderYellow} ${Style.small} mr-5`} style={{width: "20%"}} > 
  Service technicians  
  <p className={Style.info}> 6 </p>   
  </li>

  <li className=  {`list-group-item  ${Style.textyellow} ${Style.flex} 
  ${Style.borderYellow} ${Style.small} mr-5`} style={{width: "20%"}} > 
  Subcon technicians  
  <p className={Style.info}> 6 </p>   
  </li>

  <li className=  {`list-group-item ${Style.textyellow} ${Style.flex} 
  ${Style.borderYellow} ${Style.small} mr-5`} style={{width: "20%"}} > 
  Color Code
  <p className={Style.info}> y </p>   
  </li>

  </ul>
    </div>
             </div>
        </div>
    )
}

export default DashboardFootCard