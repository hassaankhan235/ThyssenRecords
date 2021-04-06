import React from 'react'
import {useMutation} from '@apollo/client'
import gql from 'graphql-tag'

import Styles from '../TechnicianDash/table.module.css'

const DELETE_SER_TBT = gql`
mutation WRITEserTBT($Refid: String){
    deleteSerTbt(Refid: $Refid)
}
`

const DeleteTbt = (props) => {

    const {Refid, dept} = props
    const [deleteSerTbt] = useMutation(DELETE_SER_TBT)
    
    const Delete = async (id) => {
        const res =await deleteSerTbt({variables: {
            Refid: Refid
        }})
        console.log(res);
    }
    
    // const [tbtToDel, setTbtToDel] = useState()

    return (
        <div onClick={() => Delete(Refid)}>
            <span className={Styles.DelRecord}> Delete Record </span>
        </div>
    )
}

export default DeleteTbt
