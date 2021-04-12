import React, { useContext } from 'react'

import HazardTypeContext from '../../../HazardTypeContext'

function Select(props) {

  const {TBT,SafetyAlert} = useContext(HazardTypeContext)

  console.log('TBT USER', TBT)
  const {type, handlechange} = props
  
  const list = type === 'TBT' ? TBT
                               :
                               SafetyAlert
                                       
                               return (
        <>
        <div className="form-group row mt-3">
  <label htmlFor="site" className="col-sm-2 col-form-label">Site Name</label>
    <div className="col-sm-10">
            <select class="form-select form-select-lg" onChange={(e) => handlechange(e)} name='Select'>
  <option selected>Open this select menu</option>
  {
  list.map(item => {
     return <option value={item} > {item} </option>
  })}
</select>
</div>
</div>
        </>
    )
}

export default Select
