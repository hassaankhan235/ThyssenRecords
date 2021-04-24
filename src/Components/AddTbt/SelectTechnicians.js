import React, { useState } from 'react'

import AutoSuggestInputBox from '../autosuggest/autoSuggestInputBox'

const SelectTechnicians = (props) => {

    const [flag,setFlag] = useState(true)
    const {technicians, tbtDetails, SettbtDetails, ind}  = props

    const handleChange = (index,techName, techId) => {
        /* Following code to access each individual name and id object of tbtDetails object */
        var list = [...tbtDetails]
        list[index]['name'] = techName  
        list[index]['id'] = techId
        // console.log("TECHiNDEX &&&" ,list);
        // console.log('CHECKING', dept==='Ser', dept);
        SettbtDetails(list)
        console.log("List Now", list);
        }

    return (
        <div>
            {technicians.length === 0 ?
      <div class="alert alert-success" role="alert">
    <span style={{color:'red'}}> No technician in the database. Please Add a technician first </span>
    </div>  :
            <div key={ technicians.name}>
      <AutoSuggestInputBox index= {ind} callback={handleChange} name='name' flag = {flag} setFlag = {setFlag}
      technicians={technicians} reuseable={false} />
</div>}
        </div>
    )
}

export default SelectTechnicians
