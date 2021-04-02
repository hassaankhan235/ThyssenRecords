import React, {useContext} from 'react'

import IdentityContext from '../../IdentityContext'
import MenuContext from '../../MenuContext'
import Layout from './layout/layout'
import LoginCard from './app/components/LoginCard'
import WelcomeCard from '../WelcomeCard'
import MenuCar from './app/components/MenuCar'
import Styles from './app/components/Dash.module.css'

function AddTopic() {
    
    const {user} = useContext(IdentityContext)
    const {Menustatus} = useContext(MenuContext)

    return (
        <div className={`bg-secondary text-light ${Styles.fh}`}>
            <Layout />
            {user.email ? <WelcomeCard /> : <LoginCard />}
            Add Topic Form Here
            {Menustatus ? <MenuCar /> : null}
        </div>
    )
}

export default AddTopic
