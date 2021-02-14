const { ApolloServer, gql } = require("apollo-server-lambda");
const fauna = require('faunadb')

const q = fauna.query;

const typeDefs = gql`
  type Query {
    message: String
  }
`;

const resolvers = {
    Query: {
      message: async (parent, args, context) => {
        try{
          var client = new fauna.Client({secret: "fnAD8k-3RiACB8K1iVEw5OgNm-JRLgWZHOuYAd7v"})
          let res = await client.query(
            q.Get(
              q.Ref(q.Collection("tk-tech"), "290322190748877313")
          ))
          // console.log('CONNECTING');
          // console.log(res.data[0].data.technician);
          // console.log('CONNECTING');
          console.log('######',res);
          return "Hello From Haskhan"
        } 
        catch(err){
          console.log("ERROR",err);
        }
        try
        {
          var client = new fauna.Client({secret: "fnAD8k-3RiACB8K1iVEw5OgNm-JRLgWZHOuYAd7v"})
          let res = await client.query(
            
              )
            }
            catch(err){console.log(err);}
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