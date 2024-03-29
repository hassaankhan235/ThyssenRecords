import React ,{useState, useContext} from 'react'
import { gql, useQuery } from '@apollo/client'

import Matrix from '../../src/Components/Matrix/Matrix'
import WelcomeCard from '../WelcomeCard'
import LoginCard from './app/components/LoginCard'
import Layout from './layout/layout'
import IdentityContext from '../../IdentityContext'
import MenuContext from '../../MenuContext'
import DeptControl from '../Components/Matrix/DeptControl'
import MatrixTypeControl from '../template/MatrixTypeControl'
import Pagination from '../Components/Pagination/Pagination'
import Loader from '../Components/loader'

function MatrixControl() {
    
    const [MatrixType, setMatrixType] = useState('')
    const [deptSelected, setdeptSelected] = useState(false)
    const [dept, SetDept] = useState('')
    const [MatrixTypeSelected, setMatrixTypeSelected] = useState(false)
    const [MyPagination, setPagination] = useState(5)

    // This Function arranges TBTLIST with Letters 

    // This Function handles dept select option
    const selectDept = (e) => {
        const val = e.target.value
        // console.log('Dept', val);
        SetDept(val)
        setdeptSelected(true)
    }

    // THis function handles Type of TBT (Safety Alert v/s Gen TBT) to Show Options
    const SelectMatrixType = (e) => {
        const val = e.target.value
        setMatrixType(val)
        setMatrixTypeSelected(true)
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
        getSaList
    }
    `
    const {user} = useContext(IdentityContext)
    const {Menustatus} = useContext(MenuContext)
    
    const {loading, error, data} = useQuery(READ_QUERY)
    var tbtList, tbtListTotal;
    
    /* ************HERE WE SELECT THE LIST OF TBT TOPIC FOR MATRIX BASED ON TYPE OF MATRIX SELECTED FOR SAFETY ALERT
    THE TOPICS ARE FETCHED FROM SA COLLECTION IN FAUNA OTHERWISE FROM GENERAL TBT TOPICS ***************************/
    
    if(loading) return <Loader />
    if(error) return "error"
    else{
        tbtListTotal = MatrixType === "GenTbtMatrix" ? data.getTbtList  : data.getSaList
        tbtList = tbtListTotal.filter((tbt,i) => {
            return i>= MyPagination - 5 && i <= MyPagination
        })
        console.log("PAGINATION*************************", MyPagination);
    return (
        data &&
        <div>
        <Layout />
        {user.email ? <WelcomeCard /> : <LoginCard />}
        {/* <div className='container-fluid' style={{paddingLeft:'2.5%'}}> */}


    {/* ************************************ SELECTION OF TBT V/S SAFETY ALERT MATRIX & DEPT SELECTION ****************** */}
        {!MatrixTypeSelected && <MatrixTypeControl selectType = {SelectMatrixType} />} 
        {MatrixTypeSelected &&  <DeptControl selectdept={selectDept} /> }
    {/* ************************************* END OF SELECTIONS *************************************}



   {/* **************************************** START OF MATRIX *********************************************** */}      
{
deptSelected &&


<div className='container-fluid'>
        <div className="table-responsive">
            <table className="table table-striped table-bordered table-sm">
    
  {/*  ----------- Based on the list of TBT Topic These lines are writing table header ------------ */}
    <thead>
     <tr >
     <th scope="col" style={{backgroundColor:'blueviolet',color:'white', position:'sticky', top:'0px',position: '-webkit-sticky'}}> Name </th>
       {tbtList.map((topic) => {
           return (<th key={topic} scope="col" style={{backgroundColor:'blueviolet',color:'white'}}> {topic} </th>)
       })}
     </tr>
   </thead>
 {/*   ______END of HEADER_________ */}
            
            {dept==="SER" ? data.getTechnicians_SER.map(tech => {
               return <Matrix key={`${tech.id}`} TechId={`${tech.id}`} tbtList={tbtList} TechName={tech.name}
               dept={'SER'} MatrixType={MatrixType} />
            }) :
            data.getTechnicians_NI.map(tech => {
                return <Matrix key={`${tech.id}`} TechId={`${tech.id}`} tbtList={tbtList} TechName={tech.name}
                dept={'NI'} MatrixType={MatrixType} />
             })
            }

            </table>
        </div>
    

        <Pagination NextPagination={setPagination} totPages={tbtListTotal} currentPagination={MyPagination} />


    </div>

    }
{/* ********************* END OF MATRIX ************************** */}

        {/* {Menustatus ? <MenuCar /> : null} */}
        </div>
        // </div>
    )}
}

export default MatrixControl
