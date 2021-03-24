import React, {useContext} from "react"
import IdentityContext from '../../IdentityContext'
import MenuContext from "../../MenuContext"

import Layout from './layout/layout'
import LoginCard from './app/components/LoginCard'
import WelcomeCard from './app/components/WelcomeCard'
import AppLogedin from './app/components/appLoggedIn'
import Styles from './app/components/Dash.module.css'
import MenuCar from "./app/components/MenuCar"


export default function Home(props) {
  
  const {user} = useContext(IdentityContext)
  const {Menustatus} = useContext(MenuContext)

  return (
    <div className= {`bg-secondary ${Styles.fh}`} >
    <Layout /> 
    
    {user.email ? 
    <> <WelcomeCard /> 
   <AppLogedin />
   {Menustatus ? <MenuCar /> : null} 
  </>
  : 
    <LoginCard />
    }
    </div>
  )
}