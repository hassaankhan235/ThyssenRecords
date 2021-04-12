import React from 'react'
import {useMutation} from '@apollo/client'
import gql from 'graphql-tag'

import Styles from '../TechnicianDash/table.module.css'

const DELETE_SER_TBT = gql`
mutation DELETEserTBT($Refid: String){
    deleteSerTbt(Refid: $Refid)
}
`

const DELETE_NI_TBT = gql`
mutation DeleteNiTbt($Refid: String){
    deleteNiTbt(Refid: $Refid){
        ref{
            id
        }
    }
}
`

const DeleteTbt = (props) => {

    const {Refid, dept} = props
    const [deleteSerTbt] = useMutation(DELETE_SER_TBT)
    const [deleteNiTbt] = useMutation(DELETE_NI_TBT)
    
    const Delete = async (id) => {
        const res = dept === 'SER' ? await deleteSerTbt({variables: {
            Refid: Refid
        }}) 
        : await deleteNiTbt({variables: {
            Refid: Refid
        }})
        const Idtempchecker = dept === "SER" ? res.data.deleteSerTbt.ref.id : res.data.deleteNiTbt.ref.id
        if(Idtempchecker === Refid){alert("Succesfully Deleted. Your Record will be updated on next login")}
        console.log("********RES****************", res, Idtempchecker, Refid);
    }
    
    // const [tbtToDel, setTbtToDel] = useState()

    return (
        <div onClick={() => Delete(Refid)}>
            <span className={Styles.DelRecord}> Delete Record </span>
        </div>
    )
}

export default DeleteTbt
