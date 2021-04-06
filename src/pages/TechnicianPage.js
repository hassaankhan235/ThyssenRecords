import React, { useState } from 'react'

import NITechAllTBT from '../Components/TechnicianDash/TechnicianPage/NITechAllTBT'
import SerTechAllTBT from '../Components/TechnicianDash/TechnicianPage/SerTechAllTBT'
import SerTechAllSA from '../Components/TechnicianDash/TechnicianPage/SerTechAllSA'
import NITechAllSA from '../Components/TechnicianDash/TechnicianPage/NITechAllSA'
import Styles from '../Components/TechnicianDash/table.module.css'
import Nav from '../Components/TechnicianDash/TechnicianPage/Nav/Nav'

function TechnicianPage(props) {

    const {TechId, dept, name} = props
    const [ShowSA, setShowSA] = useState(false)
    const changeShowSAState = () => {
        setShowSA(prevState => !prevState)
    }

    console.log("DEPT & ShowSa", ShowSA, dept);
    return (
        <div className={ShowSA ? Styles.SAEditBox :  Styles.EditBox} >
            <Nav ShowAlert={changeShowSAState} />
            <h2 className={Styles.techpageHeading}> 
            {ShowSA ? "Complete SAfety alert Record": "Complete toolbox Talk Record" }  - {name} 
            </h2>
            {
            dept === 'NI' && !ShowSA ?
            <NITechAllTBT id={TechId} /> :
            dept === 'SER' && !ShowSA ?
            <SerTechAllTBT id={TechId}/> :
            dept === 'NI' && ShowSA ?
            <NITechAllSA id={TechId} /> :
            <SerTechAllSA id={TechId} />
            }
            <footer className={Styles.footer}>
                <div className={Styles.footerfirstLine}>All toolbox talks attended by technician</div>
                @copyrights Hassaan Khan - TBT Analyser
            </footer>
        </div>
    )

}

export default TechnicianPage
