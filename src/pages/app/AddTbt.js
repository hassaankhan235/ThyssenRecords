import React , {useContext, useState} from 'react'

import Layout from '../layout/layout'
import WelcomeCard from './components/WelcomeCard'
import LoginCard from './components/LoginCard'
import IdentityContext from '../../../IdentityContext'
import Styles from './components/Dash.module.css'


function AddTbt() {
    const [autoHeight, SetautoHeight] = useState(false)
    const [techlength, Settechlength] = useState([ "Technician's Name",'Technician ID / Iqama'])
    const AddTechnicians = (e) => {
        e.preventDefault()
        SetautoHeight(true)
        Settechlength([...techlength, "Technician's Name",'Technician ID / Iqama'])
    }

    const {user} = useContext(IdentityContext)

    return (
        <div className= {`bg-secondary text-light ${autoHeight? Styles.auto: Styles.fh}`} >
        <Layout />

        {user.email ? 
    <> <WelcomeCard /> 
  </>
  : 
    <LoginCard />
    }
<div className='container-fluid'>
<form>
  <div class="form-group row">
    <label for="date" class="col-sm-2 col-form-label">Date</label>
    <div class="col-sm-10">
      <input type="date" class="form-control" id="date" placeholder="Choose a date" />
    </div>
  </div>
  <div class="form-group row">
    <label for="toolbox" class="col-sm-2 col-form-label">Toolbox Topic</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="toolbox" placeholder="Select a topic" />
    </div>
  </div>


<fieldset class="form-group">
    <div class="row">
      <legend class="col-form-label col-sm-2 pt-0">Department</legend>
      <div class="col-sm-10">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="NI"  />
          <label class="form-check-label" for="gridRadios1">
            New Installation
          </label>
        </div>

        <div class="form-check">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="Ser" />
          <label class="form-check-label" for="gridRadios2">
            Service
          </label>
        </div>
</div>
</div>
</fieldset>

{techlength.map((val) => {

return(<div class="form-group row">
    <label for="techname" class="col-sm-2 col-form-label"> {val} </label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="techname" placeholder= {`Enter ${val}`} />
    </div>
  </div>
)
})}

  <div style={{display:'flex'}}>
  <input className='btn btn-success ml-auto' type='submit' value='Add more   +' onClick={(e) => {AddTechnicians(e)}}/> </div>

  <div class="form-group row mt-3">
  <label for="site" class="col-sm-2 col-form-label">Site Name</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="site" placeholder="Enter Site Name" />
    </div>
  </div>

  <div style={{display:'flex'}}>
  <input className='btn btn-primary ml-auto mb-3' type='submit' value='Save' /> </div>
</form>
        </div>
        </div>
    )
}

export default AddTbt
