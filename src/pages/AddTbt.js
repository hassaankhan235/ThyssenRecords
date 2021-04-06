import React , {useContext, useState} from 'react'


import Layout from './layout/layout'
import WelcomeCard from '../WelcomeCard'
import LoginCard from './app/components/LoginCard'
import IdentityContext from '../../IdentityContext'
import Styles from './app/components/Dash.module.css'
import AutoSuggestInputBox from '../Components/autosuggest/autoSuggestInputBox'
import { gql, useQuery } from '@apollo/client'
import SubmitTbt from '../Components/Submit/SubmitTbt';
import MenuContext from '../../MenuContext'
import MenuCar from './app/components/MenuCar'
import RadioBoxTemplate from '../template/RadioBoxTemplate'

function AddTbt() {
  const {Menustatus} = useContext(MenuContext)
  const [GenTbt, setGenTbt] = useState()                      /* Checks if  selected type of TBT is General or Safety Alert */

  const READ_QUERY =  /* If selected type of TBT is General TBT then get TBT list else get Safety Alert List*/ 
  gql`
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
    getSaList
  }
  `
  

    const [autoHeight, SetautoHeight] = useState(false)
    const [dept, setDept] = useState('ni')
    const [deptSelectFlag, setDeptSelectFlag] = useState(false) /* Checks if dept is selected */
    const [flag, setFlag] = useState(true)                      /* uncheck the options radio at start and reset */
    const [typeSelectFlag, setTypeSelectFlag] = useState(false) /* Checks if type of TBT is selected */
    const [tbtDetails, SettbtDetails] = useState([{date:'', topic:'', dept:'ni', sitename:'', type: ''}, {name: '', id: ''}])
    const {loading, error, data} = useQuery(READ_QUERY)
    // data && console.log("data RECVD*******", data); 
    
    const resetState = (e) => {
      console.log("SAFAYYAAAAANNNNNNNNN");
      setFlag(true)
      setDeptSelectFlag(false)
      setTypeSelectFlag(false)
      SettbtDetails([{date:'', topic:'', dept:'', sitename:'', type: ''}, {name: '', id: ''}])
    }

    const handleCheck = (e) => {
      e.preventDefault()
      setFlag(false)
      setDept(e.target.value)
      const val = e.target.value
      const name = e.target.name
      /* if val comes from type of tbt options and selected type is TBT set GenTBT flag to true  */
      name === "type" && val === "TBT" ? setGenTbt(true) : setGenTbt(false) 
      name === "type" ?   setTypeSelectFlag(true) : setDeptSelectFlag(true) /* to check value coming from type of TBT options or Dept options */
      SettbtDetails(prevStat => {
        const copy = [...tbtDetails]
        name === "type" ?
        copy[0].type = val   /* If value comes from type of tbt options change type property of tbtDetails object */
        :
        copy[0].dept = val  /* If value comes from Dept options change dept property of tbtDetails object */
        return copy
      })
      // console.log('dept', val, e.target.name, typeSelectFlag, tbtDetails);
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
    /* Following code to access each individual name and id object of tbtDetails object */
    var list = [...tbtDetails]
    list[index]['name'] = techName  
    list[index]['id'] = techId
    // console.log("TECHiNDEX &&&" ,list);
    // console.log('CHECKING', dept==='Ser', dept);
    SettbtDetails(list)
    console.log("List Now", list);
    }

    const AddTechnicians = (e) => {
        e.preventDefault()
        SetautoHeight(true)
        SettbtDetails([...tbtDetails, {name: '', id: ''}  ])
    }

    /* Get the user details from IdentityContext */
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

{  /* Type of TBT Options */}
  <fieldset className="form-group">
    <div className="row">
      <legend className="col-form-label col-sm-2 pt-0">Type of Toolbox Talk</legend>
      <div className="col-sm-10">
        
        <div className="form-check">
          <input className="form-check-input" type="radio" name="type" id="gridRadios1" value="TBT"  
          checked = {flag ? false : null} 
          onChange={(e) => handleCheck(e)} />
          <label className="form-check-label" htmlFor="gridRadios1">
           General Toolbox Talk
          </label>
        </div>
        
        <div className="form-check">
          <input className="form-check-input" type="radio" name="type" id="gridRadios2" value="SA" 
          checked = {flag ? false : null}
          onChange={(e) => handleCheck(e)}/>
          <label className="form-check-label" htmlFor="gridRadios2">
            Safety Alert / Accident Notification
          </label>
        </div>
</div>
</div>
</fieldset>
{/* End of Type of TBT options html code */


/* If type of TBT options selected show TBT topic field & dept options */}
  {!typeSelectFlag ? null :
  <AutoSuggestInputBox callback={handleTopicChange} name={'tbtTopic'} flag={flag} setFlag={setFlag} 
  labelName={'Toolbox Topic'} technicians={GenTbt? data.getTbtList : data.getSaList} reuseable={true}/>
  }

{!typeSelectFlag ? null :
<fieldset className="form-group">
    <div className="row">
      <legend className="col-form-label col-sm-2 pt-0">Department</legend>
      <div className="col-sm-10">
        
      <RadioBoxTemplate flag={flag} handleCheck={handleCheck} radiofieldName={'NI'} val={'NI'} />

      <RadioBoxTemplate flag={flag} handleCheck={handleCheck} radiofieldName={'Ser'} val={'Ser'} />
       
</div>
</div>
</fieldset>
}
{
/* End of code for type of tbt options & TBT topic field */

!deptSelectFlag? null
:
tbtDetails.map((val, ind) => {
if(ind === 0) return null  
else
{return(
<div key={ data.getTechnicians_NI[ind].name}>  
      <AutoSuggestInputBox index= {ind} callback={handleChange} name='name' flag = {flag} setFlag = {setFlag}
      technicians={dept==='Ser'? data.getTechnicians_SER : data.getTechnicians_NI } reuseable={false} />
</div>
)}


}
)

}

{!deptSelectFlag? null
:
  <div style={{display:'flex'}}>
  <input className='btn btn-success ml-auto' type='submit' value='Add more   +' onClick={(e) => {AddTechnicians(e)}}/> </div>
}

{!deptSelectFlag? null
:
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
}

{!deptSelectFlag? null
:
  <SubmitTbt tbtdetails={tbtDetails} reset={resetState}/>
} 
</form>
        </div>
        {Menustatus ? <MenuCar /> : null}
        </div>
    )
}

export default AddTbt
