import React from 'react'
import Styles from './dashFoot.module.css'
import Style from './Dash.module.css'

function DashboardFootCard() {
    return (
        <div className={`${Styles.footer} `}>
             <div className='card' >
             <div class="card-body">
    <ul className= {`list-group d-flex flex-row justify-content-center` } >
  <li className=  {`list-group-item  ${Style.textyellow} ${Style.flex} 
  ${Style.borderYellow} ${Style.small} mr-5`} style={{width: "20%"}} > 
  NI technicians  
  <p className={Style.info}> 6 </p>   
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