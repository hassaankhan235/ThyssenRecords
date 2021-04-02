import React from 'react'

import Styles from '../Components/Matrix/matrix.module.css' 

function MatrixTypeControl(props) {
    
    const {selectType} = props
    
    return (
        <div>
                <div className= {`container-fluid ${Styles.matrixSettings}`}>
              <h5> <u> TYPE OF MATRIX </u> </h5>
               <div className="row">
      <legend className="col-form-label col-sm-4 pt-0"> Select Which Type of Matrix to show </legend>
          <div className="col-sm-8">
        <div className="form-check ">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" 
  value="SA-MATRIX" 
  onChange={(e) => selectType(e)}  />
  <label className="form-check-label" htmlFor="inlineRadio1">SAFETY ALERT MATRIX</label>
</div>

<div className="form-check ">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" 
  onChange={(e) => selectType(e)} 
  value="GenTbtMatrix" />
  <label className="form-check-label" htmlFor="inlineRadio1"> GENERAL TBT MATRIX</label>
</div>
</div>
</div>
</div>
        
        </div>
    )
}

export default MatrixTypeControl
