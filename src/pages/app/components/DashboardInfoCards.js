import React from 'react'
import Loader from '../../../Components/loader'

import Styles from './Dash.module.css'

function DashboardInfoCards(props) {



    const {title,  firstinfo, secinfo, firsttotal, secondtotal, thirdtotal, fourthtotal} = props
    return (
        <div>
            <div className={` card mr-2 mr-0 ${Styles.individualBlock}`} style={{width: "18rem"}} >
  <div className="card-body">
    <h5 className={`card-title ${Styles.heading}`}  > {title} </h5>
    <h6 className={`card-subtitle mt-1 ${Styles.Dashsubheading}`}> New Installation </h6>
    
    <ul className= {`list-group` }>
  <li className=  {`list-group-item ${Styles.textyellow} ${Styles.flex} ${Styles.borderYellow}`} > {firstinfo}  
  <p className={Styles.info}> {!firsttotal && firsttotal!== 0 ? <Loader text={false}/> : firsttotal } </p>   
  </li>
  <li className=  {`list-group-item ${Styles.textyellow} ${Styles.flex} ${Styles.borderYellow}` } > {secinfo}  
  <p className={Styles.info}> {!secondtotal && secondtotal !== 0 ? <Loader text={false}/> : secondtotal} </p>   
  </li>
</ul>

<h6 className= {`card-subtitle mt-2 ${Styles.Dashsubheading}`}> Service </h6>
<ul className="list-group">
    <li className=  {`list-group-item ${Styles.textyellow} ${Styles.flex} ${Styles.borderYellow}` } > {firstinfo}  
  <p className={Styles.info}> {!thirdtotal && thirdtotal!==0 ? <Loader text={false}/> : thirdtotal} </p>   
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
