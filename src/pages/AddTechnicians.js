import React, {useState ,useContext} from 'react'

import MenuCar from './app/components/MenuCar'
import IdentityContext from '../../IdentityContext'
import MenuContext from '../../MenuContext'
import LoginCard from './app/components/LoginCard'
import WelcomeCard from '../WelcomeCard'
import Styles from './app/components/Dash.module.css'
import Layout from './layout/layout'
import SubmitTechnician from './app/SubmitTechnician'


function AddTechnicians() {
    
    const {user} = useContext(IdentityContext)
    const {Menustatus} = useContext(MenuContext)
    const [flag, setFlag] = useState(false)
    const [autoHeight] = useState(false)
    const [TechDetails, setTechDetails] = useState({name:'',id:'',company:'',dept:''})

    const reset = () => {
      setFlag(false)
      setTechDetails({name:'',id:'',company:'',dept:''})
    }

    const handleChange = (e) => {
      e.target.type === 'radio' && setFlag(true)
      const name = e.target.name
      const value = e.target.value 
      setTechDetails({...TechDetails ,[name] : value})
      console.log(TechDetails,flag, e.target.type);
    }

    return (
        <div className={`bg-secondary text-light ${autoHeight? Styles.auto: Styles.fh}`}>
            <Layout />
            {user.email ? <WelcomeCard /> : <LoginCard />}
            <div className='container-fluid' style={{paddingLeft:'2.5%'}}>

    <form>
  
    <div class="form-group row">
    <label htmlFor="inputEmail3" class="col-sm-2 col-form-label">Full Name</label>
    <div class="col-sm-10">
      <input type="text" 
      name="name"
      className="form-control" 
      id="inputEmail3" 
      value={TechDetails.name} 
      placeholder="Enter Full Name" 
      onChange={(e) => handleChange(e)}  />
    </div>
  </div>

  <div className="form-group row">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">ID / Iqama</label>
    <div className="col-sm-10">
      <input 
      name='id'
      type="text" className="form-control" id="inputEmail3" value={TechDetails.id}
      placeholder="Enter Company Id / Citizenship Number" 
      onChange={(e) => handleChange(e)}  />
    </div>
  </div>

  <div class="form-group row">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Company Name</label>
    <div class="col-sm-10">
      <input 
      name="company"
      type="text" 
      className="form-control" 
      id="inputEmail3" 
      placeholder="Enter Company Name"
      value={TechDetails.company}
      onChange={(e) => handleChange(e)} />
    </div>
  </div>

  <fieldset className="form-group">
    <div className="row">
      <legend className="col-form-label col-sm-2 pt-0">Department</legend>
      <div className="col-sm-10">
        
        <div className="form-check">
          <input 
          name="dept"
          className="form-check-input" 
          type="radio" 
          id="gridRadios1" 
          value="NI"  
          checked = {flag ? null : false}
          onChange={(e) => handleChange(e)} />
          <label className="form-check-label" htmlFor="gridRadios1">
            New Installation
          </label>
        </div>

        <div className="form-check">
          <input 
          name="dept"
          className="form-check-input" 
          type="radio" 
          id="gridRadios2" 
          value="Ser" 
          checked = {flag ? null : false}
          onChange={(e) => handleChange(e)}/>
          <label className="form-check-label" htmlFor="gridRadios2">
            Service
          </label>
        </div>
</div>
</div>
</fieldset>

<SubmitTechnician TechDetails={TechDetails} reset={reset} />
</form>
  </div>
  {Menustatus ? <MenuCar /> : null}
        </div>
    )
}

export default AddTechnicians
