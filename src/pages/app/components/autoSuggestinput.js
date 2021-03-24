import React from 'react'

import Styles from './autocomp.module.css'

function AutoSuggestinput(props) {
    const {name, value, disabled, onchange,lostFocus,setState} = props
    return (
        <div>
              <div className="form-group row">
    <label htmlFor="techname" className="col-sm-2 col-form-label"> Technician's ID </label>
    <div className="col-sm-10">
    <input className={`input-group-text ${Styles.input}`} type="text" value={value} name={name} disabled={disabled} 
     onChange={(e) => onchange(e)} onKeyDown={(e) => lostFocus(e)} onBlur={() => {
        setState(prevState => ({ ...prevState , suggest:[]}))
    }}
    />
    </div>
  </div>
        </div>
    )
}

export default AutoSuggestinput
