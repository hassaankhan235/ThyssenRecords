import React from 'react'

import Styles from './Dash.module.css'

function DashboardInfoCards(props) {
    const {title,  firstinfo, secinfo, total} = props
    return (
        <div>
            <div class="card mr-2" style={{ width: "18rem"}} >
  <div class="card-body">
    <h5 class="card-title"> {title} </h5>
    <h6 class="card-subtitle mb-2 text-primary"> Thyssenkrupp </h6>
    
    <ul class= {`list-group` }>
  <li className=  {`list-group-item bg-info ${Styles.textyellow} ${Styles.flex} ${Styles.borderYellow} ` } > {firstinfo}  
  <p className={Styles.info}> {total} </p>   
  </li>
  <li className=  {`list-group-item bg-info ${Styles.textyellow} ${Styles.flex} ${Styles.borderYellow}` } > {secinfo}  
  <p className={Styles.info}> 6 </p>   
  </li>
</ul>

<h6 class="card-subtitle mb-2 text-primary mt-2"> Subcontractor </h6>
<ul class="list-group">
    <li className=  {`list-group-item bg-info ${Styles.textyellow} ${Styles.flex} ${Styles.borderYellow}` } > {firstinfo}  
  <p className={Styles.info}> 6 </p>   
  </li>
  <li className=  {`list-group-item bg-info ${Styles.textyellow} ${Styles.flex} ${Styles.borderYellow}` } > {secinfo}  
  <p className={Styles.info}> 6 </p>   
  </li>
</ul>
    
  </div>
</div>
        </div>
    )
}

export default DashboardInfoCards
