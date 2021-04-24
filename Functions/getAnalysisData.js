const { gql } = require("apollo-server-lambda");
const fauna = require('faunadb');

const q = fauna.query;

let d = new Date();
let year = d.getFullYear()
let month = d.getMonth() + 1
month = month < 10 ? `0${month}` : month 
let date = d.getDate()
date = date < 10 ? `0${date}` : date


exports.TbtAnalysisResolver = {
    Query: {
        getNiTbtCountByHazard: async (_, args) => {
            // 
            try{
              var client = new fauna.Client({secret: process.env.MY_SECRET})
              res = await client.query(
                q.Count(q.Range (q.Match(q.Index("NITbt-ByCatAndDate"), args.topic), 
                q.Date(`${year-1}-${month}-${date}`), q.Date(`${year}-${month}-${date}`)  )  )
                )
                console.log("HazardWise Data NI", res)
                return res
              }
              catch(err){
                console.log('ERROR', err)
              }
          },
          getSerTbtCountByHazard: async (_, args) => {
            // 
            try{
              var client = new fauna.Client({secret: process.env.MY_SECRET})
              res = await client.query(
                q.Count(q.Range (q.Match(q.Index("SerTbt-ByCatAndDate"), args.topic), 
                q.Date(`${year-1}-${month}-${date}`), q.Date(`${year}-${month}-${date}`)  )  )
                )
                console.log("HazardWise Data Ser", res, args)
                return res
              }
              catch(err){
                // console.log('ERROR', err)
              }
          },
          getNIAttCountByHazard: async (_, args) => {
            // 
            try{
              var client = new fauna.Client({secret: process.env.MY_SECRET})
              res = await client.query(
                    q.Map(q.Paginate(q.Range(
                    q.Match(q.Index('NITbt-ByCatAndDate'), args.topic ), 
                    q.Date(`${year-1}-${month}-${date}`), q.Date(`${year}-${month}-${date}`) 
                      ), 
                    ),
                      q.Lambda(['date', 'ref'], q.Count(q.Select(['data','id'], q.Get(q.Var('ref')))) )
                    )
                )
                console.log("Attendance Count NI", res.data)
                return res.data
              }
              catch(err){
                console.log('ERROR', err)
              }
          },
          getSerAttCountByHazard: async (_, args) => {
            // 
            try{
              var client = new fauna.Client({secret: process.env.MY_SECRET})
              res = await client.query(
                    q.Map(
                    q.Paginate(
                    q.Range(
                    q.Match(q.Index('SerTbt-ByCatAndDate'), args.topic ), 
                    q.Date(`${year-1}-${month}-${date}`), q.Date(`${year}-${month}-${date}`) 
                      ), 
                    ),
                      q.Lambda(['date', 'ref'], q.Count(q.Select(['data','id'], q.Get(q.Var('ref')))) )
                    )
                )
                console.log("Attendance Count SER", res.data)
                return res.data
              }
              catch(err){
                console.log('ERROR', err)
              }
          },
    },
}