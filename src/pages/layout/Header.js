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
    <input type='button' value='Menu' className={Styles.MenuButton} onClick={(e) => showMenu(e)} />
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
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
