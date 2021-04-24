import React from 'react'

import MySelect from '../autosuggest/MySelect'


const SelectTopic = (props) => {
    
    const {topics, tbtDetails, SettbtDetails} = props

    const handleTopicChange = (topic, HazType) => {
      console.log('NAME & VALUE',topic, HazType);
      SettbtDetails(prevStat=>{
        const copy = [...tbtDetails]
        copy[0].topic = topic
        copy[0].category = HazType
        return copy
      })
    }
    
    return (
        <div>
          {topics.length === 0 ?
      <div class="alert alert-success" role="alert">
    <span style={{color:'red'}}> No topics in the database. Please add Safety Alert / TBT first and then use </span>
    </div>
    :
    <>
            <MySelect handlechange={handleTopicChange} name={'tbtTopic'} labelName={'Toolbox Topic'} 
  topics={topics} reuseable={true}/>
  /* This is Select box to show type of Hazards for TBT & type Incident for Safety Alert */
  
<div className="form-group row mt-3">
  <label htmlFor="site" className="col-sm-2 col-form-label"> Hazard Type </label>
    <div className="col-sm-10">
      <input type="text" className="form-control" value={tbtDetails[0].category} disabled style={{color:'blue'}} />
        </div>
        </div>
        </>
        }
        </div>
    )
}

export default SelectTopic
