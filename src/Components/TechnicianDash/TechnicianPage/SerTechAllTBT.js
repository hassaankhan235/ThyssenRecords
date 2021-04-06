import React, { useState } from 'react'
import {gql, useQuery} from '@apollo/client'

import Loader from '../../loader'
import DeleteTbt from '../../Submit/DeleteTbt'

function SerTechAllTBT(props) {



const READ_QUERY = gql`
query AllSERTBTByTechnicianId($id: String){
    AllSerTBTByTechnicianID(id: $id){
      ref{
          col
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
const {id} = props
const {loading, error, data} = useQuery(READ_QUERY,  { variables: {id },} )

if(loading) return <Loader />
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
      {data && data.AllSerTBTByTechnicianID.map(tbt => {
          return(<tr key={tbt.ts}>
            <td> {loading? <Loader /> : tbt.data.date} </td>
            <td> {loading? <Loader /> : tbt.data.site} </td>
            <td> {loading? <Loader /> : tbt.data.topic}  </td>
            <td> <DeleteTbt Refid={tbt.ref.id} /> </td> 
            </tr>
          )
      })}
    </tbody>
    </table>
    </div>
    )
}

export default SerTechAllTBT
