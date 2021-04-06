import React from 'react'

import Style from '../../Components/Matrix/matrix.module.css'
import RadioBoxTemplate from '../../template/RadioBoxTemplate'

function SelectTbtType(props) {

    const {flag, handlecheck} = props
    return (
        <div className= {`container-fluid ${Style.matrixSettings}`} >
            <h5> <u> TYPE SELECTION </u> </h5>
        <fieldset className="form-group">
        <div className="row">
          <legend className="col-form-label col-sm-3 pt-0"> Type Of Toolbox Talk Topic to Add </legend>
          <div className="col-sm-9">
            
          <RadioBoxTemplate radiofieldName={'Safety Alert'} val={'SA'} flag={flag} handleCheck={(e) => handlecheck(e)}/>
          <RadioBoxTemplate radiofieldName={'General Toolbox Talk'} val={'TBT'} flag={flag} handleCheck={handlecheck} />
    
          </div>
          </div>
          </fieldset>
          </div>
    )
}

export default SelectTbtType
