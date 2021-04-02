import fetch from 'cross-fetch'
import { RetryLink } from '@apollo/client/link/retry';
import {ApolloClient, InMemoryCache, createHttpLink, from} from '@apollo/client'



const additiveLink = from([
    new createHttpLink({
        uri: "/.netlify/functions/getData",
        fetch
    }),
    new createHttpLink({
        uri: "/.netlify/functions/getSafetyAlert",
        fetch
    })
]);

export const client = new ApolloClient({
    link : additiveLink,
    cache: new InMemoryCache({
        dataIdFromObject: o => (o._id ? `${o.__typename}:${o._id}`: null),
      })
})