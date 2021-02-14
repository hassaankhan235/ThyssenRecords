const React = require('react')
const {IdentityProvider} = require('./IdentityContext')
const {ApolloProvider} = require('@apollo/client')
const {client} = require('./client')

export const wrapRootElement = ({element}) => (
    <ApolloProvider client = {client}>
    <IdentityProvider>
    {element}
    </IdentityProvider>
    </ApolloProvider>
)
