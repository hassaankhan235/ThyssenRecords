import React from 'react'
import {graphql} from 'gatsby'

/* 
This function defines the second method to get data from 
graphql using props. This method provides the benefit that
you can define the name of query & you can pass in variables
to the query in the paranthesis after the name of the query

In this method you define graphql query using the const data &
export the data constant
& then you can find the queried data in the data object of props
*/

function Example({data}) {
  var title
  data ? {
      site: {
        siteMetadata: { title },
      },
  } = data : null
  return <div>Hello Example dada {data && title} </div>
}

export const data = graphql`
query MyQuery{
    site{
      siteMetadata{
        title
      }
    }
  }
`

export default Example
