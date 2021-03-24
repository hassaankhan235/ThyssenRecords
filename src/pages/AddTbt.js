import React , {useContext, useState} from 'react'


import Layout from './layout/layout'
import WelcomeCard from './app/components/WelcomeCard'
import LoginCard from './app/components/LoginCard'
import IdentityContext from '../../IdentityContext'
import Styles from './app/components/Dash.module.css'
import AutoSuggestInputBox from './app/components/autoSuggestInputBox'
import { gql, useQuery } from '@apollo/client'
import SubmitTbt from './app/SubmitTbt';
import MenuContext from '../../MenuContext'
import MenuCar from './app/components/MenuCar'

function AddTbt() {
  const {Menustatus} = useContext(MenuContext)
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
    getTbtList
  }
  `
    const [autoHeight, SetautoHeight] = useState(false)
    const [dept, setDept] = useState('ni')
    const [deptSelectFlag, setDeptSelectFlag] = useState(false)
    const [flag, setFlag] = useState(true)
    const [tbtDetails, SettbtDetails] = useState([{date:'', topic:'', dept:'ni', sitename:''}, {name: '', id: ''}])
    const {loading, error, data} = useQuery(READ_QUERY)
    // data && console.log("data RECVD*******", data); 
    
    const resetState = (e) => {
      setFlag(true)
      setDeptSelectFlag(false)
      SettbtDetails([{date:'', topic:'', dept:'ni', sitename:''}, {name: '', id: ''}])
    }

    const handleCheck = (e) => {
      setDept(e.target.value)
      const val = e.target.value
      console.log('dept', val);
      setFlag(true)
      setDeptSelectFlag(true)
      SettbtDetails(prevStat => {
        const copy = [...tbtDetails]
        copy[0].dept = val
        return copy
      })
    }

    const handleTopicChange = (_,value) => {
      console.log('NAME & VALUE',value);
      SettbtDetails(prevStat=>{
        const copy = [...tbtDetails]
        copy[0].topic = value
        return copy
      })
    }

    const handleChange = (index,techName, techId) => {
    var list = [...tbtDetails]
    list[index]['name'] = techName
    list[index]['id'] = techId
    console.log("TECHiNDEX &&&" ,list);
    console.log('CHECKING', dept==='Ser', dept);
    SettbtDetails(list)
    console.log("List Now", list);
    }

    const AddTechnicians = (e) => {
        e.preventDefault()
        SetautoHeight(true)
        SettbtDetails([...tbtDetails, {name: '', id: ''}  ])
    }

    const {user} = useContext(IdentityContext)

    if (loading) return 'loading...'
    if (error) return `Error -- ${error}`
    return (
        <div className= {`bg-secondary text-light ${autoHeight? Styles.auto: Styles.fh}`} >
        <Layout />

        {user.email ? 
   <WelcomeCard />
  : 
    <LoginCard />
    }
<div className='container-fluid' style={{paddingLeft:'2.5%'}}>
<form>
  <div className="form-group row">
    <label htmlFor="date" className="col-sm-2 col-form-label">Date</label>
    <div className="col-sm-10">
      <input type="date" className="form-control" id="date" placeholder="Choose a date"  value={tbtDetails[0].date} 
      onChange={(e) => { /* THis function makes the Site Name text box a controlled text box  */
        const val = e.target.value
        return(SettbtDetails(prevStat => {
          const copy = [...prevStat]
          copy[0].date = val
          return copy
        }))
      }
        }  />
    </div>
  </div>
  <AutoSuggestInputBox callback={handleTopicChange} name={'tbtTopic'} flag={flag} setFlag={setFlag} 
  technicians={data.getTbtList} reuseable={true}/>


<fieldset className="form-group">
    <div className="row">
      <legend className="col-form-label col-sm-2 pt-0">Department</legend>
      <div className="col-sm-10">
        
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="NI"  
          onChange={(e) => handleCheck(e)} />
          <label className="form-check-label" htmlFor="gridRadios1">
            New Installation
          </label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="Ser" 
          onChange={(e) => handleCheck(e)}/>
          <label className="form-check-label" htmlFor="gridRadios2">
            Service
          </label>
        </div>
</div>
</div>
</fieldset>

{
!deptSelectFlag? null
:
tbtDetails.map((val, ind) => {
if(ind == 0) return null  
else
{return(
<div key={ data.getTechnicians_NI[ind].name}>  
      <AutoSuggestInputBox index= {ind} callback={handleChange} name='name' flag = {flag} setFlag = {setFlag}
      technicians={dept=='Ser'? data.getTechnicians_SER : data.getTechnicians_NI } reuseable={false} />
</div>
)}


}
)

}
  <div style={{display:'flex'}}>
  <input className='btn btn-success ml-auto' type='submit' value='Add more   +' onClick={(e) => {AddTechnicians(e)}}/> </div>

  <div className="form-group row mt-3">
  <label htmlFor="site" className="col-sm-2 col-form-label">Site Name</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="site" 
      onChange={(e) => { /* THis function makes the Site Name text box a controlled text box  */
        const val = e.target.value
        return(SettbtDetails(prevStat => {
          const copy = [...prevStat]
          copy[0].sitename = val
          return copy
        }))
      }
        } 
      placeholder="Enter Site Name" 
      value={tbtDetails[0].sitename} />
    </div>
  </div>

  <SubmitTbt tbtDetails={tbtDetails} reset={resetState}/>

</form>
        </div>
        {Menustatus ? <MenuCar /> : null}
        </div>
    )
}

export default AddTbt
