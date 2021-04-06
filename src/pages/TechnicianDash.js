import React, {useContext} from 'react'

import Layout from './layout/layout'
import IdentityContext from '../../IdentityContext'
import WelcomeCard from '../WelcomeCard'
import AppLogedin from './app/components/appLoggedIn'
import TechnicianMatrix from '../Components/TechnicianDash/TechnicianMatrix'
import MenuContext from '../../MenuContext'
import MenuCar from './app/components/MenuCar'
import LoginCard from './app/components/LoginCard'

function TechnicianDash() {
    
    const {user} = useContext(IdentityContext)
    const {Menustatus} = useContext(MenuContext)

    return (
        <div  >
              <Layout /> 
    
    {user.email ? 
    <> <WelcomeCard /> 
   <TechnicianMatrix />
  </>
  : 
  <LoginCard />
}
  {Menustatus ? <MenuCar /> : null} 
        </div>
    )
}

export default TechnicianDash
