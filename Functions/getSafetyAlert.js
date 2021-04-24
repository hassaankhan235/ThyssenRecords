const { gql } = require("apollo-server-lambda");
const fauna = require('faunadb');

const q = fauna.query;
let d = new Date();
let year = d.getFullYear()
let month = d.getMonth() + 1
month = month < 10 ? `0${month}` : month 
let date = d.getDate()
date = date < 10 ? `0${date}` : date

exports.SAtypeDefs = gql`
type SA{
  NISafetyAlertMonth: Int
  getSaList:  [String]
}
`


exports.getSAresolver = {
    Query: {
      // THis will return the Number of Safety Alerts done this month
    //     NISafetyAlertMonth: async (parent, args, context) => {
    //     try{
    //       var client = new Client({secret: 'fnAEFY3AhIACBS71dX5TNClK3L0OVDFJYdiesU5J'})
    //       let res = await client.query(
    //         q.Count(q.Match(q.Index('NIsa_ByDate'))   )
    //       )
    //       console.log("Safety Alert********",res);
    //       return res
    //     } 
    //     catch(err){
    //       console.log("ERROR",err);
    //     }
    // },
        getSaList: async () => {
          // This will return the list of safety alerts done is this year
          try{
            var client = new fauna.Client({secret: process.env.MY_SECRET})
            res = await client.query(
              q.Map(
                q.Paginate(
                  q.Range(q.Match(q.Index("getSaList")),q.Date(`${year-1}-${month}-${date}`), q.Date(`${year}-${month}-${date}`) )
                ),
                q.Lambda(["x", "y"], q.Select(["data", "topic"], q.Get(q.Var("y"))))
              )
              )
              console.log("Toolbox Talks", res)
              return res.data
            }
            catch(err){
              console.log('ERROR', err)
            }
        },
        getNiSA6Months: async (parent, args, context) => {
          try{
            let sixthmnth = month <= 6 ? 1 : 7  
            var client = new fauna.Client({secret: process.env.MY_SECRET})
            let res = await client.query(
              q.Map(
                q.Paginate(
                  q.Range(q.Match(q.Index("NIsa_ByDate")),q.Date(`${year -1}-${month}-01`), q.Date(`${year}-${month}-${date}`) )
                ),
                q.Lambda(["x", "y"], q.Select(["data"], q.Get(q.Var("y"))))
              )
            )
            console.log("*********************NI Safety Alerts 1 Year********",res);
            return res.data
          } 
          catch(err){
            console.log("ERROR",err);
          }
        },
        getSerSA6Months: async (parent, args, context) => {
          try{
            let sixthmnth = month <= 6 ? 1 : 7  
            var client = new fauna.Client({secret: process.env.MY_SECRET})
            let res = await client.query(
              q.Map(
                q.Paginate(
                  q.Range(q.Match(q.Index("SERsa_ByDate")),q.Date(`${year -1}-${month}-01`), q.Date(`${year}-${month}-${date}`) )
                ),
                q.Lambda(["x", "y"], q.Select(["data"], q.Get(q.Var("y"))))
              )
            )
            console.log("*********************NI Safety Alerts 1 Year********",res);
            return res.data
          } 
          catch(err){
            console.log("ERROR",err);
          }
        },
},
Mutation: {
  writeNISA: async(_, SADetails) => {
    console.log('NI TBT DETAILS', SADetails);
    try{
      var client = new fauna.Client({secret: process.env.MY_SECRET})
      var res = await client.query(
        q.Create(q.Collection('ni-sa'),{data:
        {
          topic: SADetails.topic,
          site: SADetails.site,
          date: SADetails.date,
          category: SADetails.category,
          id: SADetails.id
        }}
        ))
        console.log('Recieved',);
        return res
    }
    catch(err){console.log('ERROR', err);}
  },
  writeSERSA: async(_, tbtDetails) => {
    console.log('NI TBT DETAILS', tbtDetails);
    try{
      var client = new fauna.Client({secret: process.env.MY_SECRET})
      var res = await client.query(
        q.Create(q.Collection('ser-sa'),{data:
        {
          topic: tbtDetails.topic,
          site: tbtDetails.site,
          date: tbtDetails.date,
          category: tbtDetails.category,
          id: tbtDetails.id
        }}
        ))
        console.log(JSON.stringify(res));
        return JSON.stringify(res.ref)
    }
    catch(err){console.log('ERROR', err);}
  },
  writeSaTopic: async(_, topicDetails) => {
    console.log('Topic Details', topicDetails);
    try{
      var client = new fauna.Client({secret: process.env.MY_SECRET})
      var res = await client.query(
        q.Create(q.Collection('sa-list'),{data:
        {
          topic:           topicDetails.topic,
          HazardType:      topicDetails.HazardType,
          date:            topicDetails.date,
          location:        topicDetails.location
        }}
        ))
        console.log('SATOPIC ADDED RECVD',res.data.topic);
        return res.data.topic
    }
    catch(err){console.log('ERROR', err);}
  },
}
}



