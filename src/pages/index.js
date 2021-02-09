import React from "react"
import {useStaticQuery, graphql} from 'gatsby'
import netlifyIdentity from 'netlify-identity-widget'

import Example from './example.tsx'
import Images from './images'
import Products from './Products'

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

  const {site:{siteMetadata:{title}}} = useStaticQuery(getdata) 
  return (
    <div>
  title : {title}
  Hello world!
  <Products />
  <input type= "submit" name="Login" 
  onClick={()=>netlifyIdentity.open()} />
  </div>
  )
}
