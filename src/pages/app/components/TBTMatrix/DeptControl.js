import React from 'react'

function DeptControl(props) {
    const {selectdept} = props
    return (
        <div>
            <div className="container-fluid">
        <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" 
  value="NI" onChange={(e) => selectdept(e)}  />
  <label class="form-check-label" for="inlineRadio1">New Installation</label>
</div>

<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" 
  onChange={(e) => selectdept(e)} value="SER" />
  <label class="form-check-label" for="inlineRadio1"> Service</label>
</div>
</div>
        </div>
    )
}

export default DeptControl
