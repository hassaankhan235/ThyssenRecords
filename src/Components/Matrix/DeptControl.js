import React from 'react'

import Styles from './matrix.module.css'

function DeptControl(props) {
    const {selectdept} = props
    return (
            <div className= {`container-fluid ${Styles.matrixSettings}`}>
              <h5> <u> Settings </u> </h5>
               <div className="row">
      <legend className="col-form-label col-sm-2 pt-0"> Select Department </legend>
          <div className="col-sm-10">
        <div className="form-check ">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" 
  value="NI" onChange={(e) => selectdept(e)} />
  <label className="form-check-label" htmlFor="inlineRadio1">New Installation</label>
</div>

<div className="form-check ">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" 
  onChange={(e) => selectdept(e)} value="SER" />
  <label className="form-check-label" htmlFor="inlineRadio1"> Service</label>
</div>
</div>
</div>
</div>
        
    )
}

export default DeptControl


