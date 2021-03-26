import React from 'react'
import {useMutation} from '@apollo/client'
import gql from 'graphql-tag'

const WRITE_NI_TBT = gql`
mutation WRITEniTBT($topic:String, $site: String, $date: String, $id: [String]){
    writeNItbt(topic: $topic, site: $site, date: $date, id: $id)
}
`

const WRITE_SER_TBT = gql`
mutation WRITEniTBT($topic:String, $site: String, $date: String, $id: [String]){
    writeSERtbt(topic: $topic, site: $site, date: $date, id: $id)
}
` 


function SubmitTbt(props) {
    
    const {tbtdetails, reset} = props
    console.log("TBT TO SUBMIT" ,tbtdetails[0].dept);
    const id = tbtdetails.map(tbtDetail => tbtDetail.id)
    const filteredId = id.filter(ufid => ufid !== undefined)
    console.log('ID is', filteredId);

    const [writeNItbt] = useMutation(WRITE_NI_TBT)
    const [writeSERtbt] = useMutation(WRITE_SER_TBT)

    const handleSubmit =  async(e) => {
        e.preventDefault()
        tbtdetails[0].dept === 'NI' ?
        await writeNItbt({variables: {
            topic:tbtdetails[0].topic,site:tbtdetails[0].sitename,
            date:tbtdetails[0].date, id: filteredId
        }})
        :
        await writeSERtbt({variables: {
            topic:tbtdetails[0].topic,site:tbtdetails[0].sitename,
            date:tbtdetails[0].date, id: filteredId
        }})
        reset(e)
      }

    return (
            <div style={{display:'flex'}}>
  <input className='btn btn-primary ml-auto mb-3' type='submit' value='Save' onClick={e => handleSubmit(e)} /> 
  </div>
        
    )
}
export default SubmitTbt