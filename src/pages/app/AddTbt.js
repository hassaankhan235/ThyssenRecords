import React , {useContext} from 'react'

import Layout from '../layout/layout'
import WelcomeCard from './components/WelcomeCard'
import LoginCard from './components/LoginCard'
import IdentityContext from '../../../IdentityContext'
import Styles from './components/Dash.module.css'

function AddTbt() {
    
    const {user} = useContext(IdentityContext)

    return (
        <div className= {`bg-secondary ${Styles.fh}`} >
        <Layout />

        {user.email ? 
    <> <WelcomeCard /> 
  </>
  : 
    <LoginCard />
    }
            Toolbox Talk
        </div>
    )
}

export default AddTbt
