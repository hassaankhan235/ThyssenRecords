import React, {useContext} from "react"
import {useStaticQuery, graphql} from 'gatsby'
import netlifyIdentity from 'netlify-identity-widget'
import IdentityContext from '../../IdentityContext'

import Layout from './layout/layout'
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
  const {site:{siteMetadata:{title}}} = useStaticQuery(getdata) 

  return (
    <div>
    <Layout />
  title : {title}
  Hello world!
  {user.email}
  <input type= "submit" name="Login" 
  onClick={()=>netlifyIdentity.open()} />
  </div>
  )
}