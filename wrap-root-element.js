const React = require('react')
const {IdentityProvider} = require('./IdentityContext')
const {MenuProvider} = require('./MenuContext')
const {HazardContextProvider} = require('./HazardTypeContext')
const {ApolloProvider} = require('@apollo/client')
const {client} = require('./client')

export const wrapRootElement = ({element}) => (
    <ApolloProvider client = {client}>
    <HazardContextProvider>
    <IdentityProvider>
    <MenuProvider>
    {element}
    </MenuProvider>
    </IdentityProvider>
    </HazardContextProvider>
    </ApolloProvider>
)
