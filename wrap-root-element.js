const React = require('react')
const {IdentityProvider} = require('./IdentityContext')
const {MenuProvider} = require('./MenuContext')
const {ApolloProvider} = require('@apollo/client')
const {client} = require('./client')

export const wrapRootElement = ({element}) => (
    <ApolloProvider client = {client}>
    <IdentityProvider>
    <MenuProvider>
    {element}
    </MenuProvider>
    </IdentityProvider>
    </ApolloProvider>
)
