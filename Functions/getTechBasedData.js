const { gql } = require("apollo-server-lambda");
const fauna = require('faunadb');
const q = fauna.query;

let d = new Date();
let year = d.getFullYear()
let month = d.getMonth() + 1
month = month < 10 ? `0${month}` : month 
let date = d.getDate()
date = date < 10 ? `0${date}` : date




exports.TechBasedDataResolver = {
    Query: {
        CountTbtByIdNI: async (_, args) => {
          let yearFrom = year ;
          let monthFrom = month - args.subtractMonth 

          /******************************  Here it checks if current month is June or behind June it will 
          subtract one year from current year
          And also it will subtract the remaining months from previous years*****************************/
          if(monthFrom <= 0){
            console.log("MONTH & YEAR ARE", monthFrom, 12 + monthFrom);
            yearFrom = year
            monthFrom = 12 + monthFrom
            yearFrom = yearFrom -1
            // console.log("MONTH & YEAR ARE", monthFrom, year);
          }

          monthFrom = monthFrom < 10 ? `0${monthFrom}` : monthFrom
          
          try{  
            var client = new fauna.Client({secret: process.env.MY_SECRET})
            let res = await client.query(
              q.Count(q.Range(
                q.Match(q.Index("NITbt-ByIdAndDate"), args.id ), q.Date(`${yearFrom}-${monthFrom}-01`), q.Date(`${year}-${month}-${date}`)
                  ))
            )
            // console.log("********************* TBT COUNT ********",res, args);
            return res
          } 
          catch(err){
            console.log("ERROR",err);
          }
        },
        getTechnicians_NI_W_REF: async() => {
            try{
              var client = new fauna.Client({secret: process.env.MY_SECRET})
              let res = [];
              res = await client.query(
                q.Map(
                  q.Paginate(q.Match(q.Index("NItech"))),
                  q.Lambda('ref'  , q.Get(q.Var('ref'))   )
                    )
                )
                // console.log("TECHNICIANS#######", res)
                return res.data
              }
              catch(err){
                console.log('ERROR', err)
              }
          },
          CountSAByIdNI: async (_, args) => {
            try{  
              var client = new fauna.Client({secret: process.env.MY_SECRET})
              let res = await client.query(
                q.Count(q.Range(
                  q.Match(q.Index("NISa-ByIdAndDate"), args.id ), q.Date(`${year - 1}-${month}-01`), q.Date(`${year}-${month}-${date}`)
                    ))
              )
              // console.log("********************* SAFETY COUNT ********",res, args);
              return res
            } 
            catch(err){
              console.log("ERROR",err);
            }
          },
          getTechnicians_SER_W_REF: async() => {
            try{
              var client = new fauna.Client({secret: process.env.MY_SECRET})
              let res = [];
              res = await client.query(
                q.Map(
                  q.Paginate(q.Match(q.Index("SERtech"))),
                  q.Lambda('ref'  , q.Get(q.Var('ref'))   )
                    )
                )
                // console.log("TECHNICIANS#######", res)
                return res.data
              }
              catch(err){
                console.log('ERROR', err)
              }
          },
          CountTbtByIdSER: async(_, args) => {
            let yearFrom = year ;
            let monthFrom = month - args.subtractMonth 
  
            /******************************  Here it checks if current month is June or behind June it will 
            subtract one year from current year
            And also it will subtract the remaining months from previous years*****************************/
            if(monthFrom <= 0){
              console.log("MONTH & YEAR ARE", monthFrom, 12 + monthFrom);
              yearFrom = year
              monthFrom = 12 + monthFrom
              yearFrom = yearFrom -1
              console.log("MONTH & YEAR ARE", monthFrom, year);
            }
  
            monthFrom = monthFrom < 10 ? `0${monthFrom}` : monthFrom
            
            try{  
              var client = new fauna.Client({secret: process.env.MY_SECRET})
              let res = await client.query(
                q.Count(q.Range(
                  q.Match(q.Index("SerTbt-ByIdAndDate"), args.id ), q.Date(`${yearFrom}-${monthFrom}-01`), q.Date(`${year}-${month}-${date}`)
                    ))
              )
              // console.log("********************* TBT COUNT ********",res, args);
              return res
            } 
            catch(err){
              console.log("ERROR",err);
            }            
          },
          CountSAByIdSER: async (_, args) => {
            try{  
              var client = new fauna.Client({secret: process.env.MY_SECRET})
              let res = await client.query(
                q.Count(q.Range(
                  q.Match(q.Index("SERSa-ByIdAndDate"), args.id ), q.Date(`${year - 1}-${month}-01`), q.Date(`${year}-${month}-${date}`)
                    ))
              )
              // console.log("********************* SERVICE SAFETY ALERT COUNT ********",res, args);
              return res
            } 
            catch(err){
              console.log("ERROR",err);
            }
          },
          AllNiTbtByTechnicianId: async(_, args) => {
            try{  
              var client = new fauna.Client({secret: process.env.MY_SECRET})
              let res = await client.query(
                q.Map(
                  q.Paginate(
                    q.Match(q.Index('NITbt-ByIdAndDate'), args.id )
                    ),
                    q.Lambda( ['x', 'y'], q.Get(q.Var('y') ) )
                    )
              )
              // console.log("********************* All NI TECH TBT ********",res, args);
              return res.data
            } 
            catch(err){
              console.log("ERROR",err);
            }
          },
          AllSerTBTByTechnicianID: async(_, args) => {
            try{  
              var client = new fauna.Client({secret: process.env.MY_SECRET})
              let res = await client.query(
                q.Map(
                  q.Paginate(
                    q.Match(q.Index('SerTbt-ByIdAndDate'), args.id )
                    ),
                    q.Lambda( ['x', 'y'], q.Get(q.Var('y') ) )
                    )
              )
              // console.log("********************* All SER TECH TBT ********",res, args);
              return res.data
            } 
            catch(err){
              console.log("ERROR",err);
            }
          },
          AllSerSAByTechnicianID: async(_, args) => {
            try{  
              var client = new fauna.Client({secret: process.env.MY_SECRET})
              let res = await client.query(
                q.Map(
                  q.Paginate(
                    q.Match(q.Index('SERSa-ByIdAndDate'), args.id )
                    ),
                    q.Lambda( ['x', 'y'], q.Get(q.Var('y') ) )
                    )
              )
              // console.log("********************* All SER TECH TBT ********",res, args);
              return res.data
            } 
            catch(err){
              console.log("ERROR",err);
            }
          }
},
Mutation: {
  deleteSerTbt: async(_, args) => {
    console.log('SER TBT DETAILS', args);
    try{
      var client = new fauna.Client({secret: process.env.MY_SECRET})
      var res = await client.query(
        q.Delete(q.Ref(q.Collection('ser-tbt'), args.Refid))
      )
      // console.log("************** RESPONSE ****************", res);
      return res
    }
    catch(err){console.log('ERROR', err);}
  },
  deleteNiTbt: async(_, args) => {
    console.log('NI TBT DETAILS', args);
    try{
      var client = new fauna.Client({secret: process.env.MY_SECRET})
      var res = await client.query(
        q.Delete(q.Ref(q.Collection('ni-tbt'), args.Refid))
      )
      // console.log('***********RESPONSE******', res);
      return res
    }
    catch(err){console.log('ERROR', err);}
  },
}
}
