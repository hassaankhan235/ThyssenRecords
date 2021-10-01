import { useMutation } from '@apollo/client';
import { gql, useQuery } from '@apollo/client'
import React from 'react'

function SubmitTechnician(props) {

    const READ_QUERY = gql`
    {
      getTechnicians_NI{
        name
        id
      }
      getTechnicians_SER{
        name
        id
      }
    }
      `

    const WRITE_NI_TECH = gql`
    mutation Write_Ni_Tech($name:String, $id:String, $company:String){
        WriteNItech(name: $name, id:$id, company: $company)
    }
    `

    const WRITE_SER_TECH = gql`
    mutation Write_Ser_Tech($name:String, $id:String, $company:String){
        WriteSERtech(name: $name, id:$id, company: $company)
    }
    `

    const [WriteNItech] = useMutation(WRITE_NI_TECH)
    const [WriteSERtech] = useMutation(WRITE_SER_TECH)
    const {loading, error, data} = useQuery(READ_QUERY)
    const {TechDetails, reset} = props

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(TechDetails.id === 10) {console.log('bhali',TechDetails.id)}
        TechDetails.dept === 'NI' ? 
        await WriteNItech({variables:{
            name:    TechDetails.name,
            id:      TechDetails.id,
            company: TechDetails.company
        }})
        :
        await WriteSERtech({variables:{
            name:    TechDetails.name,
            id:      TechDetails.id,
            company: TechDetails.company
        }})
        reset()
    }

    return (
        <div style={{display:'flex'}}>
        <input className='btn btn-primary ml-auto mb-3' type='submit' value='Save' 
        style = {{backgroundColor:'orange', border:'0px',width:'200px'}}
        onClick={e => handleSubmit(e)} /> 
        </div>
    )
}

export default SubmitTechnician
