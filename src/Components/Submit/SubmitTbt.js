import React from 'react'
import {useMutation} from '@apollo/client'
import gql from 'graphql-tag'

const WRITE_NI_TBT = gql`
mutation WRITEniTBT($topic:String, $site: String, $date: String, $category: [String] ,$id: [String]){
    writeNItbt(topic: $topic, site: $site, date: $date, category: $category ,id: $id)
}
`

const WRITE_SER_TBT = gql`
mutation WRITEserTBT($topic:String, $site: String, $date: String, $category: [String] ,$id: [String]){
    writeSERtbt(topic: $topic, site: $site, date: $date, category: $category ,id: $id)
}
`
const WRITE_NI_SA = gql`
mutation WRITEniSA($topic:String, $site: String, $date: String, $category: [String] ,$id: [String]){
    writeNISA(topic: $topic, site: $site, date: $date, category: $category ,id: $id)
}
` 
const WRITE_SER_SA = gql`
mutation WRITEserSA($topic:String, $site: String, $date: String, $category: [String] , $id: [String]){
    writeSERSA(topic: $topic, site: $site, date: $date, category: $category ,id: $id)
}
`


function SubmitTbt(props) {
    
    const {tbtdetails, reset} = props
    // console.log("TBT TO SUBMIT" ,tbtdetails);
    const id = tbtdetails.map(tbtDetail => tbtDetail.id)
    const filteredId = id.filter(ufid => ufid !== undefined)
    // console.log('ID is', filteredId);

    const [writeNItbt] = useMutation(WRITE_NI_TBT)
    const [writeSERtbt] = useMutation(WRITE_SER_TBT)
    const [writeNISA]  = useMutation(WRITE_NI_SA)
    const [writeSERSA] = useMutation(WRITE_SER_SA)

    const handleSubmit =  async(e) => {
        e.preventDefault()
        let result, rcvd 
     if(tbtdetails[0].date === '' || tbtdetails[0].topic === '' || tbtdetails[0].sitename === '' || tbtdetails[1].name === ''){
         alert('You missed to fill some information. Try again')
     }   
     
        else{
        if(tbtdetails[0].type === 'TBT')
        {
            tbtdetails[0].dept === 'NI' ?
        result = await writeNItbt({variables: {
            topic:tbtdetails[0].topic,site:tbtdetails[0].sitename,
            date:tbtdetails[0].date, category: tbtdetails[0].category, 
            id: filteredId
        }})
        :
        result = await writeSERtbt({variables: {
            topic:tbtdetails[0].topic,site:tbtdetails[0].sitename,
            date:tbtdetails[0].date, category: tbtdetails[0].category, 
            id: filteredId
        }})
        }
        
        else{
            tbtdetails[0].dept === 'NI' ?
        result = await writeNISA({variables: {
            topic:tbtdetails[0].topic,site:tbtdetails[0].sitename,
            date:tbtdetails[0].date, category: tbtdetails[0].category, 
            id: filteredId
        }})
        :
        result = await writeSERSA({variables: {
            topic:tbtdetails[0].topic,site:tbtdetails[0].sitename,
            date:tbtdetails[0].date, category: tbtdetails[0].category,
            id: filteredId
        }})
        }
    }
        let msg = 'Added New'
        rcvd = msg.concat(tbtdetails[0].type==="TBT" && tbtdetails.dept === 'NI' ? JSON.stringify(result.data.writeNItbt) 
                                : JSON.stringify(result.data.writeSERtbt))
                                
            rcvd = msg.concat(tbtdetails[0].type=== "SA" && tbtdetails.dept === 'NI' ? JSON.stringify(result.data.writeNISA)
                                : JSON.stringify(result.data.writeSERSA) )
        let Message = rcvd.concat(' toolbox talk. Thanks Hassaan Cheetay ✔ 👍')
        alert(Message)
        console.log("Recieved back---------",rcvd, result,tbtdetails[0].type=== "SA",tbtdetails[0].dept === 'NI');
        reset(e)
      }

    return (
            <div style={{display:'flex'}}>
  <input className='btn btn-primary ml-auto mb-3' type='submit' value='Save' onClick={e => handleSubmit(e)} /> 
  </div>
        
    )
}
export default SubmitTbt