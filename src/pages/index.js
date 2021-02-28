import React, {useContext} from "react"
import IdentityContext from '../../IdentityContext'

import Layout from './layout/layout'
import LoginCard from './app/components/LoginCard'
import WelcomeCard from './app/components/WelcomeCard'
import AppLogedin from './app/components/appLoggedIn'
import Styles from './app/components/Dash.module.css'


export default function Home(props) {

  const {user} = useContext(IdentityContext)
  // const {site:{siteMetadata:{title}}} = useStaticQuery(getdata) 

  return (
    <div className= {`bg-secondary ${Styles.fh}`} >
    <Layout /> 
    
    {user.email ? 
    <> <WelcomeCard /> 
   <AppLogedin />
  </>
  : 
    <LoginCard />
    }
    </div>
  )
}