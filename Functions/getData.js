
const { ApolloServer, gql,  makeExecutableSchema } = require("apollo-server-lambda");
const { query, Client } = require('faunadb');
const { merge } = require("lodash");
const {getSAresolver, SAtypeDefs } = require('./getSafetyAlert') 
const {TechBasedDataResolver}     = require('./getTechBasedData')
const {TbtAnalysisResolver} = require('./getAnalysisData')

// const { default: context } = require("react-bootstrap/esm/AccordionContext");

const q = query;
let d = new Date();
let year = d.getFullYear()
let month = d.getMonth() + 1
month = month < 10 ? `0${month}` : month 
let date = d.getDate()
date = date < 10 ? `0${date}` : date

const typeDefs = gql`
type data {
  name: String,
  id : String,
  company: String
} 

type tbt {
  topic: String,
  site: String,
  date: String,
  id: [String]
  type: String
}

type List{
  col: String 
  id: String 
}

type tbtObject{
  ref: List,
  ts: String,
  data: tbt
}

type Technician {
  ref: List,
  ts: String,
  data: data
}

type Query {
    NItotTBTMonth: Int
    NItotAttendeesMonth: Int
    NItotTBTYear: Int
    NItotAttendeesYear: Int
    SERtotTBTMonth: Int
    SERtotAttendeesMonth: Int
    SERtotTBTYear: Int
    SERtotAttendeesYear: Int
    getTechnicians_NI: [data]
    getTechnicians_SER: [data]
    getTbtList:  [String]
    getNiTbt6Months : [tbt]
    getSerTbt6Months : [tbt]
    getSaList:  [String]
    getNiSA6Months: [tbt]
    getSerSA6Months : [tbt]
    SumOfNiTechnician: Int
    NiTbtByTechnicianId(id: String): [tbtObject]
    CountTbtByIdNI(id: String, subtractMonth: Int): Int
    CountSAByIdNI(id: String): Int
    CountTbtByIdSER(id: String, subtractMonth: Int): Int
    CountSAByIdSER(id: String): Int
    getTechnicians_NI_W_REF: [Technician]
    getTechnicians_SER_W_REF: [Technician]
    AllNiTbtByTechnicianId(id: String): [tbtObject]
    AllSerTBTByTechnicianID(id: String): [tbtObject]
    AllSerSAByTechnicianID(id: String): [tbtObject]
    getNiTbtCountByHazard(topic: String): Int
    getSerTbtCountByHazard(topic: String): Int
    getNIAttCountByHazard(topic: String): [Int]
    getSerAttCountByHazard(topic: String): [Int]
}


type Mutation {
  writeNItbt(topic:String, site: String, date: String, category: String ,id: [String]): String
  writeSERtbt(topic:String, site: String, date: String, category: String ,id: [String]): String
  WriteNItech(name:String, id:String, company:String): String
  WriteSERtech(name:String, id:String, company:String): String
  writeNISA(topic:String, site: String, date: String, category: String ,id: [String]): String
  writeSERSA(topic:String, site: String, date: String, category: String ,id: [String]): String 
  writeTbtTopic(topic:String, type:String) : String
  writeSaTopic(topic:String, type:String, date:String, location:String) : String
  deleteSerTbt(Refid: String): tbtObject
  deleteNiTbt(Refid: String): tbtObject
}
`;

const resolvers = {
    Query: {
      NItotTBTMonth: async (parent, args, context) => {
        try{
          var client = new Client({secret: 'fnAEFY3AhIACBS71dX5TNClK3L0OVDFJYdiesU5J'})
          let res = await client.query(
            q.Count(q.Range(q.Match(q.Index('NItbt-ByDate')), q.Date(`${year}-${month}-01`),  q.Date(`${year}-${month}-${date}`)  ) )
          )
          // console.log("NItotTBTMonth********",res);
          return res
        } 
        catch(err){
          console.log("ERROR",err);
        }
      },
      NItotAttendeesMonth: async(parent, args, context) => {
        try{
          var client = new Client({secret: process.env.MY_SECRET})
          let res = [];
          res = await client.query(
            q.Map(
              q.Paginate(q.Range(q.Match(q.Index('NItbt-ByDate')), q.Date(`${year}-${month}-01`),  q.Date(`${year}-${month}-${date}`)  ) ), 
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
      SERtotTBTMonth: async() => {
        try{
          
          var client = new Client({secret: process.env.MY_SECRET})
          let res = await client.query(
            q.Count(q.Range(q.Match(q.Index('SERtbt-ByDate')), q.Date(`${year}-${month}-01`),  q.Date(`${year}-${month}-${date}`)  ) )
          )
          // console.log('Sub Attendance result',res);
          return res 
        }
        catch(err){
          console.log(err);
        }
      },
      SERtotAttendeesMonth: async(parent, args, context) => {
        try{
          var client = new Client({secret: process.env.MY_SECRET})
          let res = [];
          res = await client.query(
            q.Map(
              q.Paginate(q.Range(q.Match(q.Index('SERtbt-ByDate')), q.Date(`${year}-${month}-01`),  q.Date(`${year}-${month}-${date}`)  ) ), 
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
      SERtotAttendeesYear: async(parent, args, context) => {
        try{
          var client = new Client({secret: process.env.MY_SECRET})
          let res = [];
          res = await client.query(
            q.Map(
              q.Paginate(q.Range(q.Match(q.Index('SERtbt-ByDate')), q.Date(`${year}-01-01`),  q.Date(`${year}-${month}-${date}`)  ) ), 
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
      SERtotTBTYear: async() => {
        try{
          
          var client = new Client({secret: process.env.MY_SECRET})
          let res = await client.query(
            q.Count(q.Range(q.Match(q.Index('SERtbt-ByDate')), q.Date(`${year}-01-01`),  q.Date(`${year}-${month}-${date}`)  ) )
          )
          return res 
        }
        catch(err){
          console.log(err);
        }
      },
      NItotTBTYear: async (parent, args, context) => {
        try{
          var d = new Date();
          var year = d.getFullYear()
          var client = new Client({secret: process.env.MY_SECRET})
          let res = await client.query(
            q.Count(q.Range(q.Match(q.Index('NItbt-ByDate')), q.Date(`${year}-01-01`),  q.Date(`${year}-${month}-${date}`)  ) )
          )
          return res
        } 
        catch(err){
          console.log("ERROR",err);
        }
      },
      NItotAttendeesYear: async(parent, args, context) => {
        try{
          var client = new Client({secret: process.env.MY_SECRET})
          let res = [];
          res = await client.query(
            q.Map(
              q.Paginate(q.Range(q.Match(q.Index('NItbt-ByDate')), q.Date(`${year}-01-01`),  q.Date(`${year}-${month}-${date}`)  ) ), 
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
      getTechnicians_NI: async() => {
        try{
          var client = new Client({secret: process.env.MY_SECRET})
          let res = [];
          res = await client.query(
            q.Map(
              q.Paginate(q.Match(q.Index("NItech"))),
              q.Lambda('ref', q.Select(['data']  , q.Get(q.Var('ref')) )   )
                )
            )
            // console.log("TECHNICIANS#######", res)
            return res.data
          }
          catch(err){
            console.log('ERROR', err)
          }
      },
      getTechnicians_SER: async() => {
        try{
          var client = new Client({secret: process.env.MY_SECRET})
          let res = [];
          res = await client.query(
            q.Map(
              q.Paginate(q.Match(q.Index("SERtech"))),
              q.Lambda('ref', q.Select(['data']  , q.Get(q.Var('ref')) )   )
                )
            )
            // console.log("TECHNICIANS#######", res)
            return res.data
          }
          catch(err){
            console.log('ERROR', err)
          }
      },
      getTbtList: async() => {
        try{
          var client = new Client({secret: process.env.MY_SECRET})
          res = await client.query(
            q.Paginate(
              q.Match(q.Index('getTbtList')))
            )
            // console.log("Toolbox Talks", res)
            return res.data
          }
          catch(err){
            console.log('ERROR', err)
          }
      },
      getNiTbt6Months: async (parent, args, context) => {
        try{
          let sixthmnth = month <= 6 ? 1 : 7  
          var client = new Client({secret: process.env.MY_SECRET})
          let res = await client.query(
            q.Map(
              q.Paginate(
                q.Range(q.Match(q.Index("NItbt-ByDate")),q.Date(`${year}-0${sixthmnth}-01`), q.Date(`${year}-${month}-${date}`) )
              ),
              q.Lambda(["x", "y"], q.Select(["data"], q.Get(q.Var("y"))))
            )
          )
          // console.log("NItotTBTMonth********",res);
          return res.data
        } 
        catch(err){
          console.log("ERROR",err);
        }
      },
      getSerTbt6Months: async (parent, args, context) => {
        try{
          let sixthmnth = month <= 6 ? 1 : 7  
          var client = new Client({secret: process.env.MY_SECRET})
          let res = await client.query(
            q.Map(
              q.Paginate(
                q.Range(q.Match(q.Index("SERtbt-ByDate")),q.Date(`${year}-0${sixthmnth}-01`), q.Date(`${year}-${month}-${date}`) )
              ),
              q.Lambda(["x", "y"], q.Select(["data"], q.Get(q.Var("y"))))
            )
          )
          // console.log("SER 6 Months TBT********",res);
          return res.data
        } 
        catch(err){
          console.log("ERROR",err);
        }
      },
      SumOfNiTechnician: async () => {
        try{  
          var client = new Client({secret: process.env.MY_SECRET})
          let res = await client.query(
            q.Count((q.Match(q.Index("NItech"))))
          )
          // console.log("********** TOTAL NI TECHNICIAN ********",res);
          return res
        } 
        catch(err){
          console.log("ERROR",err);
        }
      },
      NiTbtByTechnicianId: async (parent,args,context) => {
        try{  
          console.log("*****INPUTS******",parent,args,context);
          var client = new Client({secret: process.env.MY_SECRET})
          let res = await client.query(
            q.Map(
              q.Paginate(q.Match(q.Index("NITbt-ById"), "10479361")),
              q.Lambda("person", q.Get(q.Var("person")))
            )
          )
          // console.log("SER 6 Months TBT********",res);
          return (res.data)
        } 
        catch(err){
          console.log("ERROR",err);
        }
      },
    },
    Mutation: {
      writeNItbt: async(_, tbtDetails) => {
        console.log('NI TBT DETAILS', tbtDetails);
        try{
          var client = new Client({secret: process.env.MY_SECRET})
          var res = await client.query(
            q.Create(q.Collection('ni-tbt'),{data:
            {
              topic: tbtDetails.topic,
              site: tbtDetails.site,
              date: tbtDetails.date,
              category: tbtDetails.category,
              id: tbtDetails.id
            }}
            ))
        }
        catch(err){console.log('ERROR', err);}
      },
      writeSERtbt: async(_, techDetails) => {
        console.log('SERVICE TBT DETAILS', techDetails);
        try{
          var client = new Client({secret: process.env.MY_SECRET})
          var res = await client.query(
            q.Create(q.Collection('ser-tbt'),{data:
            {
              topic: techDetails.topic,
              site: techDetails.site,
              date: techDetails.date,
              category: techDetails.category,
              id: techDetails.id
            }}
            ))
            console.log(res);
        }
        catch(err){console.log('ERROR', err);}
      },
      WriteNItech: async(_, techDetails) => {
        try{
          var client = new Client({secret: process.env.MY_SECRET})
          var res = await client.query(
            q.Create(q.Collection('ni-tech'),{data:
            {
              name: techDetails.name,
              id: techDetails.id,
              company: techDetails.company
            }}
            ))
        }
        catch(err){console.log('ERROR', err);}
      },
      WriteSERtech: async(_, techDetails) => {
        console.log('Tech DETAILS', techDetails);
        try{
          var client = new Client({secret: process.env.MY_SECRET})
          var res = await client.query(
            q.Create(q.Collection('ser-tech'),{data:
            {
              name: techDetails.name,
              id: techDetails.id,
              company: techDetails.company
            }}
            ))
        }
        catch(err){console.log('ERROR', err);}
      },
      writeTbtTopic: async(_, topicDetails) => {
        console.log('TBT TOPIC DETAILS', topicDetails);
        try{
          var client = new Client({secret: process.env.MY_SECRET})
          var res = await client.query(
            q.Create(q.Collection('tbt-list'),{data:
            {
              topic: topicDetails.topic,
              type: topicDetails.type
            }}
            ))
        }
        catch(err){console.log('ERROR', err);}
      },
    },
}

makeExecutableSchema({
  typeDefs: [typeDefs, SAtypeDefs],
  resolvers: merge(resolvers, getSAresolver,TechBasedDataResolver, TbtAnalysisResolver)
})

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
  });
  
  exports.handler = server.createHandler();