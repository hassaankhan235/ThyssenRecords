import fetch from 'cross-fetch'
import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'

export const client = new ApolloClient({
    link : new createHttpLink({
        uri: "/.netlify/functions/getData",
        fetch
    }),
    cache: new InMemoryCache({
        dataIdFromObject: o => (o._id ? `${o.__typename}:${o._id}`: null),
      })
})