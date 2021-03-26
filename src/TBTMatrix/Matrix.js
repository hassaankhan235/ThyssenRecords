import React from 'react'
import { gql, useQuery } from '@apollo/client'


function Matrix(props) {
    const {TechId, tbtList, TechName, dept} = props
    // console.log('TechId', TechId);
    const READ_QUERY = gql`
    query{
        getSerTbt6Months{
            topic
            site
            date
            id
        }
        getNiTbt6Months{
            topic
            site
            date
            id
        }
    }
    `;

    const {loading, error, data} = useQuery(READ_QUERY)

    if(loading) return 'loading'

    
    else{
        // console.log("NAMES",data.getTechnicians_NI.map(td => td.id), data.getTbtList);
        // Following line to find out The TBT attended by a particular technician
        var Techrows = dept === "NI" ? data.getNiTbt6Months.filter(tbt => tbt.id.find(id=> id === TechId) ) 
        :  
        data.getSerTbt6Months.filter(tbt => tbt.id.find(id=> id === TechId) );
        // console.log("Techrows",Techrows, data);

        var TechrowsCopy = []
        
        for(var i in Techrows){
            let temp = {}
            Object.assign(temp, Techrows[i])
            temp.id = "2433857457"
            TechrowsCopy.push(temp)
            // console.log("ROWS",  TechrowsCopy,Techrows[i]);
        }
        
        

        // Following lines arrange the matrix in the order of the list of TBT
        let table = []
        console.log("CHECK FIRST",  tbtList.forEach(topic => TechrowsCopy.find(tbt => {
            if(tbt.topic === topic)
            {console.log('CHECK INSIDE', tbt); 
            table.push(tbt)}
        } 
             )));;
        // table = TechrowsCopy.filter(tbt => data.getTbtList.find(topic => tbt.topic === topic) );
        // console.log('***********',table);
        const temporary = []
        {
        const temp = []
        for(const t in table){
            if(!temp.includes(table[t].topic) ) { 
                temporary.push(table[t])
                temp.push(table[t].topic)
            }
            // console.log("TEMPORARY",temporary);
        }
        tbtList.map((topic,ind) => {
            if(temporary[ind]?.topic === topic) {
                return null
            }
            else{
                temporary.splice(ind,0,{date:"None"})
            }
        } ) 
        // console.log('Temporary',temporary, table);
    }
    // End of arranging code
    
    return (
  <tbody>
      <tr>
      <th scope="row" style={{backgroundColor:'orange',color:'white'}}>{TechName}</th> 

      {temporary.map((tbt,ind) => {
          var temp = 0
          const diff=tbtList.findIndex(topic => topic === tbt.topic) 
          console.log("Tab Row",ind,temp,diff,diff - temp === 0);
          return (             
                  <td key={`${tbt.topic}`} style={{backgroundColor:'orange',color:'white'}}><span style={{display:'block'}}>{tbt.date}</span>{tbt.site}</td> 
          )
      })}
</tr>    
  </tbody>
    )}
}

export default Matrix
