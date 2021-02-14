import React, {useEffect, useState} from 'react'
import netlifyIdentity from 'netlify-identity-widget'

const IdentityContext = React.createContext({})

const IdentityProvider = props => {
    const [user, setUser] = useState('')

    useEffect(() => {
        netlifyIdentity.init({})
    })

    netlifyIdentity.on('login', User => {
        netlifyIdentity.close()
        setUser(User)
    })

    netlifyIdentity.on('logout', User => {
        netlifyIdentity.close()
        setUser(User)
    })
    
    return(
        <IdentityContext.Provider value= 
        {{identity: netlifyIdentity, user: user}}>
        {props.children}
        </IdentityContext.Provider>
    )
}

export default IdentityContext
export {IdentityProvider}