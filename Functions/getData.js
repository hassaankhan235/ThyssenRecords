const { ApolloServer, gql } = require("apollo-server-lambda");
const fauna = require('faunadb')

const q = fauna.query;

const typeDefs = gql`
  type Query {
    totTBTyear: Int
  }
`;

const resolvers = {
    Query: {
      totTBTyear: async (parent, args, context) => {
        try{
          var client = new fauna.Client({secret: "fnAD8k-3RiACB8K1iVEw5OgNm-JRLgWZHOuYAd7v"})
          let res = await client.query(
            q.Count(
              q.Range(q.Match(q.Index("tbtBYperiod")), q.Date("2020-01-01"), q.Date("2021-12-12"))
            )
          )
          // console.log('CONNECTING');
          // console.log(res.data[0].data.technician);
          // console.log('CONNECTING');
          console.log('######',res);
          return res
        } 
        catch(err){
          console.log("ERROR",err);
        }
      }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
  });
  
  exports.handler = server.createHandler();