import React, {useContext} from 'react'

import MenuContext from '../../../MenuContext'
import Styles from '../app/components/menu.module.css'

function Header(props) {
  const {SetMenuContext} = useContext(MenuContext)
  
  const showMenu = (e) => {
    e.preventDefault()
    SetMenuContext(prevState => !prevState)
  }

  return (
  <nav className="navbar navbar-expand-lg navbar-dark " style={{backgroundColor:'#ff851b', border: '1px solid white'}} >
  <div className="container-fluid" >
  <div class="dropdown">
<button class="btn dropdown-toggle" type="button" style={{backgroundColor:'#ff851b',color:'white'}} data-toggle="dropdown" >
  Menu
</button>
<div class="dropdown-menu" style={{backgroundColor:'#ff851b'}}>
<h4 style={{color:'white'}}> Hassaan Khan </h4>  
<h6 class="dropdown-header"> Add New Records</h6>
  <a class="dropdown-item" href="../../AddTechnicians"> Add Technicians </a>
  <a class="dropdown-item" href="../../AddTopic"> Add Topic Safety Alert / TBT </a>
  <a class="dropdown-item" href="../../AddTbt"> Add Toolbox Talk </a>



<div class="dropdown-divider"></div>
<h6 class="dropdown-header"> Show Records</h6>
<a class="dropdown-item" href="../../MatrixControl"> Toolbox Matrix </a>
<a class="dropdown-item" href="../../TechnicianDash"> Technician Dashboard </a>
<div class="dropdown-divider"></div>
<a class="dropdown-item" href="../../TbtAnalysis"> Category Wise Analysis </a>
</div>
</div>

    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/"> Dashboard </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Header
