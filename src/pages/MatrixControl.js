import React ,{useState, useContext} from 'react'
import { gql, useQuery } from '@apollo/client'

import Matrix from '../../src/Components/Matrix/Matrix'
import WelcomeCard from '../WelcomeCard'
import LoginCard from './app/components/LoginCard'
import Layout from './layout/layout'
import IdentityContext from '../../IdentityContext'
import MenuContext from '../../MenuContext'
import DeptControl from '../Components/Matrix/DeptControl'
import MenuCar from "./app/components/MenuCar"
import MatrixTypeControl from '../template/MatrixTypeControl'

function MatrixControl() {
    
    const [MatrixType, setMatrixType] = useState('')
    const [dept, SetDept] = useState('')
    const [MatrixTypeSelected, setMatrixTypeSelected] = useState(false)
    const [MyPagination, setPagination] = useState(5)

    // This Function arranges TBTLIST with Letters 

    // This Function handles dept select option
    const selectDept = (e) => {
        const val = e.target.value
        // console.log('Dept', val);
        SetDept(val)
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
    var tbtList, tbtListuncomplete;
    
    /* ************HERE WE SELECT THE LIST OF TBT TOPIC FOR MATRIX BASED ON TYPE OF MATRIX SELECTED FOR SAFETY ALERT
    THE TOPICS ARE FETCHED FROM SA COLLECTION IN FAUNA OTHERWISE FROM GENERAL TBT TOPICS ***************************/
    
    if(loading) return"loading"
    if(error) return "error"
    else{
        tbtListuncomplete = MatrixType === "GenTbtMatrix" ? data.getTbtList : data.getSaList
        tbtList = tbtListuncomplete.filter((tbt,i) => {
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
MatrixTypeSelected &&


<div className='container-fluid'>
        <div className="table-responsive">
            <table className="table table-striped table-bordered table-sm">
    
  {/*  ----------- Based on the list of TBT Topic These lines are writing table header ------------ */}
    <thead>
     <tr>
     <th scope="col" style={{backgroundColor:'blueviolet',color:'white'}}> Name </th>
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
    

 {   /* ********************************************************************************************************
    This is pagination it increases pagination state by a value of 5 every time Next button is pressed until
    the state value reaches the total number of TBTS
    **********************************************************************************************************/}
        <nav aria-label="Page navigation example">
  <ul class="pagination">
<a onClick={() => setPagination(prevState => {
    console.log(prevState, tbtListuncomplete.length);
    if ( prevState + 5 > tbtListuncomplete.length )
    {return tbtListuncomplete.length}
    else
    {return prevState + 5}
    })} href="#">
     {MyPagination === tbtListuncomplete.length ? 'Previous' :   'Next'}
</a>
    </ul>
  </nav>
 { /*  *********************************************** END OF PAGINATION *************************************/}

    </div>

    }
{/* ********************* END OF MATRIX ************************** */}

        {Menustatus ? <MenuCar /> : null}
        </div>
        // </div>
    )}
}

export default MatrixControl
