import React from 'react'

function Loader(props) {
    const {text} = props || true
    return (
        <div>
              <div>
    <div className="spinner-border text-primary" role="status">
        <span className="sr-only"> Loading... </span>
      </div>
      <div> {text ? 'Loading...........' : null }  </div> 
      </div>
        </div>
    )
}

export default Loader
