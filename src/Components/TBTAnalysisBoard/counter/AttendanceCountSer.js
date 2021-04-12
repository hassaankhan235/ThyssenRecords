import React from 'react'
import {gql, useQuery} from '@apollo/client'

import Loader from '../../../Components/loader'

const AttendanceCountSer = (props) => {

    const {topic} = props
    const READ_HAZ_ATTCOUNT_SER =   
    gql`
    query getSERATTCountByHazard($topic: String){   
        getSerAttCountByHazard(topic: $topic)

  }
  `
  const {loading, error, data} = useQuery(READ_HAZ_ATTCOUNT_SER,  { variables: {topic },} )
  const SERAttCount = data && data.getSerAttCountByHazard.reduce((pv,cv) => {
    return pv + cv
},0  )

    return (
        <span>
            {loading ? <Loader /> : SERAttCount}
        </span>
    )
}

export default AttendanceCountSer