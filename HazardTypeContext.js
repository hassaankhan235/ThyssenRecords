import React, {useState} from 'react'

const HazardTypeContext = React.createContext({})

const HazardContextProvider = props => {
    const Tbt = [
        {value:'Falling Hazar', label:'Falling Hazard'}, 
        {value:'Chemical Hazard', label:'Chemical Hazard'},
        {value:'Mechanical Stored Energy', label:'Mechanical Stored Energy'},
        {value: 'Electric hazard', label:'Electric Hazard'},
        {value: 'Slip/Trip/Fall Hazard', label:'Slip/Trip/Fall Hazard'}  
    ]
    const SafetyAlert = [
        {value:'Fatal Accident', label:'Fatal Accident'}, 
        {value:'Near Miss',label:'Near Miss'}, 
        {value:'First Aid',label:'First Aid'},
        {value:'HPI', label:'HPI'},
        {value:'TRC', label:'TRC'}
    ]


return(
    <HazardTypeContext.Provider value={{TBT: Tbt, SafetyAlert: SafetyAlert}}>
        {props.children}
    </HazardTypeContext.Provider>
)
}

export default HazardTypeContext
export {HazardContextProvider}

