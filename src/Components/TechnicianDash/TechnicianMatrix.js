import React from 'react'
import { gql, useQuery } from '@apollo/client'

import TechMatrixHead from '../../Components/TechnicianDash/TechMatrixHead'
import TechMatrixTable from '../TechnicianDash/TechMatrixTable'
import Loader from '../loader'

function TechnicianMatrix() {
  
    const READ_QUERY = gql`
    {
        getTechnicians_NI_W_REF{
         ref{
          col
           id
         }
         data{
           id
           name
         }
       }
       getTechnicians_SER_W_REF{
        ref{
          id
        }
        data{
          id
          name
        }
      }
      } 
       `
       
  const { loading, error, data } = useQuery(READ_QUERY)
  if (loading) {
    return (
     <Loader />
    )
  }

  if (error) {
    return `Error Loading ${error}`
  } else
    return (
      data && (
        <div className='table-responsive'>
          <table className="table" style={{backgroundColor:"orange"}}>
          <TechMatrixHead />
          <TechMatrixTable technicians={data.getTechnicians_NI_W_REF} dept={'NI'}/>
          <TechMatrixTable technicians={data.getTechnicians_SER_W_REF} dept={'SER'}/>
          </table>
        </div>
      )
    )
}

export default TechnicianMatrix
