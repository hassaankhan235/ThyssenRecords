import React, { useContext } from 'react'

function MySelect(props) {


  // console.log('TBT USER', TBT)
  const {handlechange,reuseable, topics, labelName} = props
  

  const list =  topics 
  // type === 'TBT' ? TBT : SafetyAlert                
                                       
                               return (
        <>
        <div className="form-group row mt-3">
  <label htmlFor="site" className="col-sm-2 col-form-label"> {labelName || 'Site Name'} </label>
    <div className="col-sm-10">
            <select class="form-select form-select-lg" onChange={
              (e) =>{
              let ind = e.target.value
              let topic = list[ind].data.topic
              let HazType = list[ind].data.HazardType
              return handlechange(topic,HazType)
              }} name='Select'>
  <option defaultValue> Open this select menu </option>
  {
    list.map((item, index) => {
     return <option key={item.ts} value={index} > 
     {reuseable ? item.data.topic : item} 
     </option>
  })}
</select>

</div>
</div>
        </>
    )
}

export default MySelect
