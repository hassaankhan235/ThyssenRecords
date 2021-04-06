import React from 'react'
import {gql, useQuery} from '@apollo/client'

import Loader from '../../../Components/loader'

function TBTCountNI(props) {

    const {id, subtractMonth} = props
    
    const READ_QUERY = gql`
    query COUNTTBTBYIDNI($id: String, $subtractMonth: Int){
      CountTbtByIdNI(id: $id, subtractMonth: $subtractMonth)
    } 
  `

    const {loading, error, data} = useQuery(READ_QUERY,  { variables: {id, subtractMonth },} )
    console.log('COUNT', data);
if(error) return 'error'
if(loading) return  (
  <Loader />
)
    return (
        <span>
          
            {data?.CountTbtByIdNI}
        </span>
    )
}

export default TBTCountNI
