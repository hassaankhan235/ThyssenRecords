import React, {useState} from 'react'

const HazardTypeContext = React.createContext({})

const HazardContextProvider = props => {
    const Tbt = [
        'Falling Hazar', 
        'Chemical Hazard', 
        'Slip/Trip/Fall Hazard', 
        'Fire Hazard'
    ]
    const SafetyAlert = [
        'Fatal Accident', 
        'Near Miss', 
        'First Aid',
        'HPI',
        'TRC'
    ]


return(
    <HazardTypeContext.Provider value={{TBT: Tbt, SafetyAlert: SafetyAlert}}>
        {props.children}
    </HazardTypeContext.Provider>
)
}

export default HazardTypeContext
export {HazardContextProvider}

