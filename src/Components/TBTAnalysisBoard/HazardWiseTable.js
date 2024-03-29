import React, {useContext} from 'react'

import HazardTypeContext from '../../../HazardTypeContext'
import TbtCountNI from './counter/tbtCountNI'
import TbtCountSer from './counter/tbtCountSer'
import AttendanceCountNI from './counter/AttendanceCountNI'
import AttendanceCountSer from './counter/AttendanceCountSer'
import HazTableHead from './HazTableHead'
import Styles from './hazTable.module.css'


const HazardWiseTable = () => {

   
const {TBT} = useContext(HazardTypeContext)

    return (
        <table className="table table-border" style={{backgroundColor:"blueViolet"}}>
            <caption> HazardWise TBT's in 1 Year </caption>
            <HazTableHead />
  <tbody className={Styles.body}>

  {TBT.map(haz => {
       return(
       <tr>
       <td> {haz.label} </td>
       <td scope='row'> 
       <div>  NI = <TbtCountNI topic={haz.value} /> </div>
       <div>  Ser = <TbtCountSer topic={haz.value} /> </div>
       </td>
       <td scope='row'> 
       <div>  NI = <AttendanceCountNI topic={haz.value} /> </div> 
       <div>  Ser = <AttendanceCountSer topic={haz.value} /> </div> 
       </td>
       </tr>
       )
  })}
  

  </tbody>
  </table>
    )
}

export default HazardWiseTable
