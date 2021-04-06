import React, {useState} from 'react'
import Link from 'gatsby'

import SACountNI from './Counters/SaCountNI'
import TBTCountNI from './Counters/TBTCountNI'
import TBTCountSER from './Counters/TBTCountSER'
import SACountSER from './Counters/SACountSER'
import TechnicianPage  from '../../pages/TechnicianPage'
import Styles from './table.module.css'

function TechMatrixTable(props) {

  const [showTechDetails, setshowTechDetails] = useState(false)
  const [techRef, setTechRef] = useState()
  
  const techDetailsstate =(ref) => {
    setshowTechDetails(prevStat => !prevStat)
    setTechRef(ref)
    console.log("Change state", techRef);
  }

  const {technicians, dept} = props
  return (  
  dept === "NI" ?
  
  <tbody>
      
      {technicians.map(tech => {
        const id = tech.data.id
        return(
        <>
        <tr key={tech.ref.id}>
        <td> {tech.data.name} 
        <span className={Styles.edit} onClick={() => techDetailsstate(tech.ref.id)}> Edit </span>  </td>
        <td> {tech.data.id}  </td>
        <td> {dept}  </td>
        <td>  {<TBTCountNI id={id} subtractMonth={1} dept={"NI"} />} / {<TBTCountNI id={id} subtractMonth={6} dept={"NI"}/>}      </td>
        <td>  {<SACountNI id={id} />}       </td>
    </tr>
    <tr style={{width:'100%'}}>
       {showTechDetails && tech.ref.id === techRef ? <TechnicianPage TechId = {id} dept={'NI'} name={tech.data.name}/> : null} </tr>
    </>
    )
      })}
  </tbody>
    :
    <tbody>
      
      {technicians.map((tech) => {
        const id = tech.data.id
        return(
          <>
        <tr key={tech.ref.id}>
        <td>  {tech.data.name}  <span className={Styles.edit} onClick={() => techDetailsstate(tech.ref.id)}> Edit </span>  </td>
        <td> {tech.data.id}  </td>
        <td> {dept}  </td>
        <td>  <TBTCountSER id={id} subtractMonth={1} /> / <TBTCountSER id={id} subtractMonth={6} />      </td>
        <td>  <SACountSER id={id}/> </td>
    </tr>
    <tr style={{width:'100%'}}>
          {showTechDetails && tech.ref.id === techRef ? <TechnicianPage TechId = {id} dept={'SER'} name={tech.data.name} /> : null} </tr>
    </>
    )
  })}
  
  </tbody>
    )
}

export default TechMatrixTable
