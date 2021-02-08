import React from "react"
import {useStaticQuery, graphql} from 'gatsby'

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
  </div>
  )
}
