
import React, {useContext} from 'react'
import IdentityContext from '../../../../IdentityContext'

function WelcomeCard() {
    const {user} = useContext(IdentityContext)
    return (
        <div className='alert alert-success' style={{backgroundColor:'#AAAAAA',color:'#111111',
        border:'0px', paddingLeft:'2.5%'}}>
            {user.user_metadata.full_name}
        </div>
    )
}

export default WelcomeCard
