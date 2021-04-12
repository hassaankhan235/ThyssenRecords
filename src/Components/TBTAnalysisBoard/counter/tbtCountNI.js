import React from 'react'
import {gql, useQuery} from '@apollo/client'

import Loader from '../../../Components/loader'

const TbtCountNI = (props) => {

    const {topic} = props
    const READ_HAZ_TBTCOUNT_NI =   
    gql`
    query getNITBTCountByHazard($topic: String){
      getNiTbtCountByHazard(topic: $topic)
  }
  `
  
  const {loading, error, data} = useQuery(READ_HAZ_TBTCOUNT_NI,  { variables: {topic },} )
  console.log('NI DATA', data, topic);  
  return (
        <span>
            {loading ? <Loader /> : data?.getNiTbtCountByHazard}
        </span>
    )
}

export default TbtCountNI
