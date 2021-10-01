

import { gql, useQuery } from '@apollo/client'

function CheckExistingTech(setFlag,TechId) {

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
    if(data.getTechnicians_NI.id.includes(TechId) ) alert('Work', data)
    return(setFlag(true))
}

export default CheckExistingTech
