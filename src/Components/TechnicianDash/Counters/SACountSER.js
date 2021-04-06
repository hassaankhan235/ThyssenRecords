import React from 'react'
import {gql, useQuery} from '@apollo/client'

import Loader from '../../loader'

function SACountSER(props) {

    const {id} = props
    
    const READ_QUERY = gql`
    query COUNTSABYIDSER($id: String){
      CountSAByIdSER(id: $id)
    } 
  `

    const {loading, error, data} = useQuery(READ_QUERY,  { variables: {id },} )
    console.log('COUNT SA SER', data);
if(error) return 'error'
if(loading) return  (
  <Loader />
)
    return (
        <div>
            {data?.CountSAByIdSER}
        </div>
    )
}

export default SACountSER