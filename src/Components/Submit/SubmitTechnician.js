import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { gql, useQuery } from '@apollo/client'

function SubmitTechnician(props) {

    const READ_QUERY = gql`
    {
      getTechnicians_NI{
        id
      }
      getTechnicians_SER{
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
      const [NiExist, setNiixist] = useState(false)
      const [SerExist, setSerExist] = useState(false)
      const [MissedInfo, setMissedInfo] = useState(false)      
        
        if(TechDetails.dept === "NI" && data.getTechnicians_NI.some(obj => obj.id === TechDetails.id))
        {
          setNiixist(true)
          alert('Technician Already Exist in NI Records')
        }
        if(TechDetails.dept === "Ser" && data.getTechnicians_SER.some(obj => obj.id === TechDetails.id)) 
        {
          setSerExist(true)
          alert('Technician Already Exist in Service Records')
        }
        if(TechDetails.dept === "" || TechDetails.name === "" || TechDetails.company === "") 
        {
          setMissedInfo(true)
          alert("You missed to fill some information")
        }
        if(!NiExist && !SerExist && !MissedInfo){
        console.log('By the way', TechDetails);
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
