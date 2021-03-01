import React , {useContext} from 'react'

import Layout from '../layout/layout'
import WelcomeCard from './components/WelcomeCard'
import LoginCard from './components/LoginCard'
import IdentityContext from '../../../IdentityContext'
import Styles from './components/Dash.module.css'


function AddTbt() {
    
    const AddTechnicians = (e) => {
        e.preventDefault()
        
    return(    <div className="modal"  role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>)
    }
    const {user} = useContext(IdentityContext)

    return (
        <div className= {`bg-secondary text-light ${Styles.fh}`} >
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

<div class="form-group row">
    <label for="techname" class="col-sm-2 col-form-label">Technician Name</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="techname" placeholder="Select technician's name" />
    </div>
  </div>

  <div class="form-group row">
    <label for="techid" class="col-sm-2 col-form-label">Technician ID / Iqama</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="techid" placeholder="Select technician's ID" />
    </div>
  </div>

  <div class="form-group row">
    <label for="techname" class="col-sm-2 col-form-label">Technician Name</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="techname" placeholder="Select technician's name" />
    </div>
  </div>

  <div class="form-group row">
    <label for="techid" class="col-sm-2 col-form-label">Technician ID / Iqama</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="techid" placeholder="Select technician's ID" />
    </div>
  </div>
  <div style={{display:'flex'}}>
  <input className='btn btn-success ml-auto' type='submit' value='Add more' onClick={(e) => {AddTechnicians(e)}}/> </div>

  <div class="form-group row mt-3">
    <label for="site" class="col-sm-2 col-form-label">Site Name</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="site" placeholder="Enter Site Name" />
    </div>
  </div>

  <div style={{display:'flex'}}>
  <input className='btn btn-primary ml-auto' type='submit' value='Save' /> </div>
</form>
        </div>
        </div>
    )
}

export default AddTbt
