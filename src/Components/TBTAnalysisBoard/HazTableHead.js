import React from 'react'

import Styles from './hazTable.module.css'

const HazTableHead = () => {
    return (
        <thead style={{position:"sticky", top: '0'}}>
<tr>
  <th scope="col" className={Styles.th}>Hazard Type</th>
  <th scope="col" className={Styles.th}>Total TBTs</th>
  <th scope="col" className={Styles.th}>Attendance</th>
</tr>
</thead>
    )
}

export default HazTableHead

