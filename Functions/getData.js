const { ApolloServer, gql } = require("apollo-server-lambda");
const fauna = require('faunadb');
// const { default: context } = require("react-bootstrap/esm/AccordionContext");

const q = fauna.query;
let d = new Date();
let year = d.getFullYear()
let month = d.getMonth() + 1
month = month < 10 ? `0${month}` : month 
console.log('MONTH', month);
let date = d.getDate()

const typeDefs = gql`
  type Query {
    TKtotTBTMonth: Int
    TKtotAttendeesMonth: Int
    TKtotTBTYear: Int
    TKtotAttendeesYear: Int
    SUBtotTBTMonth: Int
    SUBtotAttendeesMonth: Int
    SUBtotTBTYear: Int
    SUBtotAttendeesYear: Int
  }
`;

const resolvers = {
    Query: {
      TKtotTBTMonth: async (parent, args, context) => {
        try{
          var d = new Date();
          var year = d.getFullYear()
          var client = new fauna.Client({secret: process.env.MY_SECRET})
          let res = await client.query(
            q.Count(q.Range(q.Match(q.Index('TKtbt-ByDate')), q.Date(`${year}-${month}-01`),  q.Date(`${year}-${month}-${date}`)  ) )
          )
          return res
        } 
        catch(err){
          console.log("ERROR",err);
        }
      },
      TKtotAttendeesMonth: async(parent, args, context) => {
        try{
          var client = new fauna.Client({secret: process.env.MY_SECRET})
          let res = [];
          res = await client.query(
            q.Map(
              q.Paginate(q.Range(q.Match(q.Index('TKtbt-ByDate')), q.Date(`${year}-${month}-01`),  q.Date(`${year}-${month}-${date}`)  ) ), 
              q.Lambda(['x','y'],  q.Count(q.Select(  ['data', 'id']      ,q.Get(  q.Var('y') )   ))  )
                )
          )
          result = res.data.reduce((acc, val) => {
            return acc + val 
          }, 0);

          return result 
        }
        catch(err){
          console.log("ERROR",err);
        }
      }, 
      SUBtotTBTMonth: async() => {
        try{
          
          var client = new fauna.Client({secret: process.env.MY_SECRET})
          let res = await client.query(
            q.Count(q.Range(q.Match(q.Index('SUBtbt-ByDate')), q.Date(`${year}-${month}-01`),  q.Date(`${year}-${month}-${date}`)  ) )
          )
          console.log('Sub Attendance result',res);
          return res 
        }
        catch(err){
          console.log(err);
        }
      },
      SUBtotAttendeesMonth: async(parent, args, context) => {
        try{
          var client = new fauna.Client({secret: process.env.MY_SECRET})
          let res = [];
          res = await client.query(
            q.Map(
              q.Paginate(q.Range(q.Match(q.Index('SUBtbt-ByDate')), q.Date(`${year}-${month}-01`),  q.Date(`${year}-${month}-${date}`)  ) ), 
              q.Lambda(['x','y'],  q.Count(q.Select(  ['data', 'id']      ,q.Get(  q.Var('y') )   ))  )
                )
          )
          result = res.data.reduce((acc, val) => {
            return acc + val 
          }, 0);

          return result 
        }
        catch(err){
          console.log("ERROR",err);
        }
      },
      SUBtotAttendeesYear: async(parent, args, context) => {
        try{
          var client = new fauna.Client({secret: process.env.MY_SECRET})
          let res = [];
          res = await client.query(
            q.Map(
              q.Paginate(q.Range(q.Match(q.Index('SUBtbt-ByDate')), q.Date(`${year}-01-01`),  q.Date(`${year}-${month}-${date}`)  ) ), 
              q.Lambda(['x','y'],  q.Count(q.Select(  ['data', 'id']      ,q.Get(  q.Var('y') )   ))  )
                )
          )
          result = res.data.reduce((acc, val) => {
            return acc + val 
          }, 0);

          return result 
        }
        catch(err){
          console.log("ERROR",err);
        }
      },
      SUBtotTBTYear: async() => {
        try{
          
          var client = new fauna.Client({secret: process.env.MY_SECRET})
          let res = await client.query(
            q.Count(q.Range(q.Match(q.Index('SUBtbt-ByDate')), q.Date(`${year}-01-01`),  q.Date(`${year}-${month}-${date}`)  ) )
          )
          return res 
        }
        catch(err){
          console.log(err);
        }
      },
      TKtotTBTYear: async (parent, args, context) => {
        try{
          var d = new Date();
          var year = d.getFullYear()
          var client = new fauna.Client({secret: process.env.MY_SECRET})
          let res = await client.query(
            q.Count(q.Range(q.Match(q.Index('TKtbt-ByDate')), q.Date(`${year}-01-01`),  q.Date(`${year}-${month}-${date}`)  ) )
          )
          return res
        } 
        catch(err){
          console.log("ERROR",err);
        }
      },
      TKtotAttendeesYear: async(parent, args, context) => {
        try{
          var client = new fauna.Client({secret: process.env.MY_SECRET})
          let res = [];
          res = await client.query(
            q.Map(
              q.Paginate(q.Range(q.Match(q.Index('TKtbt-ByDate')), q.Date(`${year}-01-01`),  q.Date(`${year}-${month}-${date}`)  ) ), 
              q.Lambda(['x','y'],  q.Count(q.Select(  ['data', 'id']      ,q.Get(  q.Var('y') )   ))  )
                )
          )
          result = res.data.reduce((acc, val) => {
            return acc + val 
          }, 0);

          return result 
        }
        catch(err){
          console.log("ERROR",err);
        }
      },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
  });
  
  exports.handler = server.createHandler();