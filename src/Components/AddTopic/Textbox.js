import React from 'react'

function Textbox(props) {

    const {labelName, name, value, placeholder, handlechange, fieldType} = props
    return (
        <div className="form-group row">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> {labelName} </label>
        <div className="col-sm-10">
          <input type={fieldType} 
          name= {name}
          className="form-control" 
          value = {value}
          placeholder={placeholder} 
          onChange={(e) => handlechange(e)}  />
        </div>
      </div>
    )
}

export default Textbox
