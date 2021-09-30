import React from 'react'

import { gql, useQuery } from '@apollo/client'

function CheckExistingTech(props) {

    const {setflag,Techid} = props
    const READ_QUERY =
    gql`
    {
        getTechnicians_NI{
          name
          id
        }
        getTechnicians_SER{
          name
          id
        }
    `
    const {loading, error, data} = useQuery(READ_QUERY)
    if(data.getTechnicians_NI.id.includes(Techid) ) alert('Work', data)
    return(null)
}

export default CheckExistingTech
