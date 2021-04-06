import React from 'react'

function RadioBoxTemplate(props) {

    const {handleCheck, flag, radiofieldName, val} = props

    return (
        <div className="form-check">
        <input className="form-check-input" 
        type="radio" 
        name="gridRadios" 
        id="gridRadios1" 
        value= {val}
        checked = {flag ? false : null} 
        onChange={(e) => handleCheck(e)} />
        <label className="form-check-label" htmlFor="gridRadios1">
          {radiofieldName}
        </label>
        </div>
    )
}

export default RadioBoxTemplate





