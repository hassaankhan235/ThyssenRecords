import React from 'react'
import {gql, useQuery} from '@apollo/client'

import Loader from '../../../Components/loader'

const AttendanceCountNI = (props) => {

    const {topic} = props
    const READ_HAZ_ATTCOUNT_NI =   
    gql`
    query getNIATTCOUNTByHazard($topic: String){   
        getNIAttCountByHazard(topic: $topic)

  }
  `
  const {loading, error, data} = useQuery(READ_HAZ_ATTCOUNT_NI,  { variables: {topic },} )
  const NIAttCount = data && data.getNIAttCountByHazard.reduce((pv,cv) => {
      return pv + cv
  },0  )
    return (
        <span>
            {loading ? <Loader /> : NIAttCount}
        </span>
    )
}

export default AttendanceCountNI