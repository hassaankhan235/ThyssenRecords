import React ,{useState, useContext} from 'react'
import { gql, useQuery } from '@apollo/client'

import Matrix from '../TBTMatrix/Matrix'
import WelcomeCard from '../WelcomeCard'
import LoginCard from './app/components/LoginCard'
import Layout from './layout/layout'
import IdentityContext from '../../IdentityContext'
import Styles from './app/components/Dash.module.css'
import DeptControl from '../TBTMatrix/DeptControl'

function MatrixControl() {
    
    const [dept, SetDept] = useState('')

    const selectDept = (e) => {
        const val = e.target.value
        console.log('Dept', val);
        SetDept(val)
    }

    const READ_QUERY = gql`
    {
        getTechnicians_SER{
            name
            id
            company
        }
        getTechnicians_NI{
            name
            id
            company
        }
        getTbtList
    }
    `
    const {user} = useContext(IdentityContext)
    const {loading, error, data} = useQuery(READ_QUERY)
    const [autoHeight] = useState(false)
    console.log(data);

    if(loading) return"loading"
    if(error) return "error"
    else{
    return (
        data &&
        <div className={`bg-secondary text-light ${autoHeight? Styles.auto: Styles.fh}`}>
        <Layout />
        {user.email ? <WelcomeCard /> : <LoginCard />}
        {/* <div className='container-fluid' style={{paddingLeft:'2.5%'}}> */}

        <DeptControl selectdept={selectDept} />

        <div className="table-responsive">
            <table className="table table-striped">
      
    <thead>
     <tr>
     <th scope="col" style={{backgroundColor:'blueviolet',color:'white'}}> Name </th>
       {data.getTbtList.map(topic => {
           return (<th key={topic} scope="col" style={{backgroundColor:'blueviolet',color:'white'}}> {topic} </th>)
       })}
     </tr>
   </thead>

            
            {dept==="SER" ? data.getTechnicians_SER.map(tech => {
               return <Matrix key={`${tech.id}`} TechId={`${tech.id}`} tbtList={data.getTbtList} TechName={tech.name}
               dept={'SER'} />
            }) :
            data.getTechnicians_NI.map(tech => {
                return <Matrix key={`${tech.id}`} TechId={`${tech.id}`} tbtList={data.getTbtList} TechName={tech.name}
                dept={'NI'} />
             })
            }

            </table>
        </div>
        </div>
        // </div>
    )}
}

export default MatrixControl
