import React from 'react'

import Styles from './table.module.css'

function TechMatrixHead() {
    return (
        <thead style={{position:"sticky", top: '0'}}>
        <tr>
          <th scope="col" className={Styles.th}>Name Tech</th>
          <th scope="col">Tech ID</th>
          <th scope="col">Department</th>
          <th scope="col">Total TBTs 
          <div style={{fontSize:'xx-small', color:'red'}}> This Month / 
          <span style={{fontSize:'xx-small', color:'green'}}> 6 Months </span>  </div> </th>
          <th scope="col">Total S-Alerts
          <div style={{fontSize:'xx-small', color:'red'}}> In Last 1 year </div> </th>
        </tr>
      </thead>
      
    )
}

export default TechMatrixHead
