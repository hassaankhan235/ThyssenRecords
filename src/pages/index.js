import React, {useContext} from "react"
import {useStaticQuery, graphql} from 'gatsby'
import IdentityContext from '../../IdentityContext'

import Layout from './layout/layout'
import LoginCard from './app/LoginCard'

const getdata = graphql`
{
  site{
    siteMetadata{
      title
    }
  }
}
`

export default function Home(props) {

  const {user} = useContext(IdentityContext)
  // const {site:{siteMetadata:{title}}} = useStaticQuery(getdata) 

  return (
    <div>
    <Layout /> 
    {user.email ? 'Welcome Dada' : <LoginCard/> }
    </div>
  )
}