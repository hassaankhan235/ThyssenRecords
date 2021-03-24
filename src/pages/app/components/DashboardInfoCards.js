import React from 'react'

import Styles from './Dash.module.css'

function DashboardInfoCards(props) {
    const {title,  firstinfo, secinfo, firsttotal, secondtotal, thirdtotal, fourthtotal} = props
    return (
        <div>
            <div class="card mr-2" style={{ width: "18rem"}} >
  <div className="card-body">
    <h5 className="card-title"> {title} </h5>
    <h6 className="card-subtitle mb-2 text-primary"> Thyssenkrupp </h6>
    
    <ul className= {`list-group` }>
  <li className=  {`list-group-item ${Styles.textyellow} ${Styles.flex} ${Styles.borderYellow}`} > {firstinfo}  
  <p className={Styles.info}> {firsttotal} </p>   
  </li>
  <li className=  {`list-group-item ${Styles.textyellow} ${Styles.flex} ${Styles.borderYellow}` } > {secinfo}  
  <p className={Styles.info}> {secondtotal} </p>   
  </li>
</ul>

<h6 class="card-subtitle mb-2 text-primary mt-2"> Subcontractor </h6>
<ul class="list-group">
    <li className=  {`list-group-item ${Styles.textyellow} ${Styles.flex} ${Styles.borderYellow}` } > {firstinfo}  
  <p className={Styles.info}> {thirdtotal} </p>   
  </li>
  <li className=  {`list-group-item ${Styles.textyellow} ${Styles.flex} ${Styles.borderYellow}` } > {secinfo}  
  <p className={Styles.info}> {fourthtotal} </p>   
  </li>
</ul>
    
  </div>
</div>

        </div>
    )
}

export default DashboardInfoCards
