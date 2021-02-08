import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Image from 'gatsby-image'
import {Link} from 'gatsby'

import styles from './products.module.css'

const query = graphql`
  {
    allContentfulItems{
      nodes {
        price
        title
        subTitle
        image{
          fluid{
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`
const Products = () =>{
  const data = useStaticQuery(query)
    const 
    {allContentfulItems: { nodes: products},
} = data 
    return(
        <div className={styles.check}>
            {
                products.map(product=>{
                    return (
                      <span>
                      <h2>
                      {product.subTitle}
                        </h2>
                        <span className={styles.images}> 
                      <Image fluid={product.image.fluid}></Image>
                      </span>
                      <Link to = {`/prods/${product.subTitle}`}>
                        Details
                      </Link>
                      </span>
                        )
                })
            }
        </div>
    )
}


export default Products