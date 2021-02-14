import fetch from 'cross-fetch'
import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'

export const client = new ApolloClient({
    link : new createHttpLink({
        uri: "http://localhost:8888/.netlify/functions/getData",
        fetch,
    }),
    cache: new InMemoryCache()
})