import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import Image from 'gatsby-image'

const getImages = graphql`
{
  file(relativePath: {eq: "pexels-photo-460621.jpeg"}){
    childImageSharp{
      fixed(width:800){
        ...GatsbyImageSharpFixed
      }
    }
  }
  fluid:file(relativePath:{eq: "pexels-photo-460622.jpeg"}){
    childImageSharp{
      fluid{
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
}
`

function Images() {

  const data = useStaticQuery(getImages)
  console.log('Images data' ,data)
  console.log("IMAGING")  

  return (
    <div>
      Hello From Images 
      <Image fixed = {data.file.childImageSharp.fixed} />
      <Image fluid={data.fluid.childImageSharp.fluid} />
    </div>
  )
}


export default Images
