import React, {useContext, useState} from 'react'

import IdentityContext from '../../IdentityContext'
import Layout from './layout/layout'
import LoginCard from './app/components/LoginCard'
import WelcomeCard from '../WelcomeCard'
import Styles from './app/components/Dash.module.css'
import SelectTbtType from '../Components/AddTopic/SelectTbtType'
import Textbox from '../Components/AddTopic/Textbox'
import SubmitTopic from '../Components/AddTopic/SubmitTopic'
import HazardTypeContext from '../../HazardTypeContext'
import Select from 'react-select'

export const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? 'blueViolet' : 'white',
        color:  isFocused ? 'white' : 'black',
        cursor: isFocused ? 'pointer' : 'default',
      };
    },
    
  };
  
function AddTopic() {


    const {user} = useContext(IdentityContext)

    const [flag, setFlag] = useState(true)
    const [tbtType, setTbtType] = useState("none")  
    const [tbtTypeSelected, settbtTypeSelected] = useState(false) 
    const [TopicDetails, setTopicDetails] = useState({topic:'',type:[] ,date:'',location:''})
    const {TBT,SafetyAlert} = useContext(HazardTypeContext)

    const handlecheck = (e) => {
        const val = e.target.value
        setFlag(false)
        settbtTypeSelected(true)
        setTbtType(val)
        // console.log(tbtType, val, tbtTypeSelected,flag);
    }

    const handleSelect = (selectedValue) => {
        let type = selectedValue.map(obj => obj.value)
        setTopicDetails({...TopicDetails, type : type })
        // console.log('Details', TopicDetails, type);
    }

    const handlechange = (e) => {
        const name = [e.target.name]
        setTopicDetails({...TopicDetails, [name] : e.target.value})
        // console.log('Details', TopicDetails);
    }

    const options = tbtType === 'SA' ? SafetyAlert : TBT 

    const Reset = () => {
        setFlag(true)
        setTbtType('')  
        settbtTypeSelected(false) 
        setTopicDetails({topic:'',type:'',date:'',location:''})
    }

    return (
        <div className={`bg-secondary text-light ${Styles.fh}`}>
            <Layout />
            {user.email ? <WelcomeCard /> : <LoginCard />}
            
{/* ******************************* SELECT TYPE OF TBT TO ADD (Safety Alert OR GEN TBT) ************************** */}
      {!tbtTypeSelected && 
      <SelectTbtType flag={flag} handlecheck={handlecheck} />}


      {/* ******************************* END OF TBT TYPE SELECTION ************************** */}


{/* ******************************* START MAIN FORM FOR ADDING TOPIC ************************** */}
     { tbtTypeSelected
     &&
      <div className="container-fluid"  style={{paddingLeft:'2.5%'}}>
          <form>
          
          <Textbox labelName={'ToolBox Talk Topic'} name={'topic'} value={TopicDetails.topic} 
          placeholder={'Enter Full Name'} handlechange={handlechange} fieldType={'text'}/>
          
          {tbtType === 'SA' &&
          <Textbox labelName={'Date'} name={'date'} value={TopicDetails.date} 
          placeholder={'Enter the date'} handlechange={handlechange} fieldType={'date'}/>}

        <div className="form-group row">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"> Type </label>
        <div className="col-sm-10">
          <Select options= {options} isMulti name="type" onChange={handleSelect} 
          styles={colourStyles} placeholder={tbtType === 'SA' ? 'Select type of incident' : 'Select type of hazard'} />
        </div>
        </div>

         {tbtType === 'SA' &&
         <Textbox labelName={'Location of Incident '} name={'location'} value={TopicDetails.location} 
          placeholder={'Enter the location of Incident'} handlechange={handlechange} fieldType={'text'}/>}

          <SubmitTopic tbtType={tbtType} topicDetails={TopicDetails} reset={Reset} />
          </form>

      </div>}

            {/* {Menustatus ? <MenuCar /> : null} */}
        </div>
    )
}

export default AddTopic
