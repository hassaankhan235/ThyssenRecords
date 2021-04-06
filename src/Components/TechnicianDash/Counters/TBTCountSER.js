import React from 'react'
import {gql, useQuery} from '@apollo/client'

import Loader from '../../../Components/loader'

function TBTCountSER(props) {

    const {id, subtractMonth} = props
    
    const READ_QUERY = gql`
    query COUNTTBTBYIDSER($id: String, $subtractMonth: Int){
        CountTbtByIdSER(id: $id, subtractMonth: $subtractMonth)
    } 
  `

    const {loading, error, data} = useQuery(READ_QUERY,  { variables: {id, subtractMonth },} )
    console.log('COUNT SER', data,id,subtractMonth);
if(error) return 'error'
if(loading) return  (
  <Loader />
)
    return (
        <span>
            {data?.CountTbtByIdSER}
        </span>
    )
}

export default TBTCountSER
