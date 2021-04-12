import React from 'react'
import {gql, useQuery} from '@apollo/client'

import Loader from '../../../Components/loader'

const TbtCountSer = (props) => {

    const {topic} = props
    const READ_HAZ_TBTCOUNT_SER =   
    gql`
    query getSERTBTCountByHazard($topic: String){
        getSerTbtCountByHazard(topic: $topic)
  }
  `
  
  const {loading, error, data} = useQuery(READ_HAZ_TBTCOUNT_SER,  { variables: {topic },} )
    return (
        <span>
            {loading ? <Loader /> : data?.getSerTbtCountByHazard}
        </span>
    )
}

export default TbtCountSer