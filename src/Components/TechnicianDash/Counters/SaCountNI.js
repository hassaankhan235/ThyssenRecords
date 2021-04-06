import React from 'react'
import {gql, useQuery} from '@apollo/client'

import Loader from '../../loader'

function SACountNI(props) {

    const {id} = props
    
    const READ_QUERY = gql`
    query COUNTSABYIDNI($id: String){
      CountSAByIdNI(id: $id)
    } 
  `

    const {loading, error, data} = useQuery(READ_QUERY,  { variables: {id },} )
    console.log('COUNT', data);
if(error) return 'error'
if(loading) return  (
  <Loader />
)
    return (
        <div>
            {data?.CountSAByIdNI}
        </div>
    )
}

export default SACountNI