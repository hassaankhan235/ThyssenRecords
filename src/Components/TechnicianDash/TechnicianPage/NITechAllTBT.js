import React from 'react'
import {gql, useQuery} from '@apollo/client'

import Loader from '../../loader'
import DeleteTbt from '../../../Components/Submit/DeleteTbt'

const READ_QUERY = gql`
query AllNITBTByTechnicianId($id: String){
    AllNiTbtByTechnicianId(id: $id){
      ref{
        id
      }
      ts
      data{
        date
        topic
        site
      }
    }
}
`


function NITechAllTBT(props) {
    
    const {id} = props
    const {loading, error, data} = useQuery(READ_QUERY,  { variables: {id },} )
    
        return (     
          <div className='table-responsive'> 
            <table className="table table-striped" >
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Site</th>
                <th scope="col">Topic</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody style={{color:'white'}}>
      {data && data.AllNiTbtByTechnicianId.map(tbt => {
          console.log('ALL TBT DATA', tbt);
          return(<tr>
            <td> {loading? <Loader /> : tbt.data.date} </td>
            <td> {loading? <Loader /> : tbt.data.site} </td>
            <td> {loading? <Loader /> : tbt.data.topic} </td>
            <td> <DeleteTbt Refid={tbt.ref.id} dept={'NI'} /> </td>
            </tr>
          )
      })}
    </tbody>
    </table>
    </div>
    )
}


export default NITechAllTBT
