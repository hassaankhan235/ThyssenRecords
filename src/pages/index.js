import React, {useContext} from "react"
import {useStaticQuery, graphql, Link} from 'gatsby'
import IdentityContext from '../../IdentityContext'

import Layout from './layout/layout'
import LoginCard from './app/LoginCard'
import WelcomeCard from './app/WelcomeCard'
import AppLogedin from './app/appLoggedIn'


export default function Home(props) {

  const {user} = useContext(IdentityContext)
  // const {site:{siteMetadata:{title}}} = useStaticQuery(getdata) 

  return (
    <>
    <Layout /> 
    
    {user.email ? 
    <> <WelcomeCard /> 
   <AppLogedin />
  </>
  : 
    <LoginCard />
    }
    </>
  )
}