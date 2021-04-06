import React from 'react'
import { gql, useQuery } from '@apollo/client'
import {v4 as uuid} from 'uuid'

import Styles from './matrix.module.css'
import Loader from '../loader'

function Matrix(props) {
    const {TechId, tbtList, TechName, dept, MatrixType} = props
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
        getNiSA6Months{
            topic
            site
            date
            id
        }
        getSerSA6Months{
            topic
            site
            date
            id
        }
    }
    `;

    const {loading, error, data} = useQuery(READ_QUERY)

    if(loading) return <Loader />
    if(error) return `Error Loading ${error}`
    
    else{
        var NiTbt6Months, SerTbt6Months;
        /* *****************************************************  Here we select the topics for which matrix has to be 
        drawn based on type of matrix selected in Matrix Control*************************************************   */

        NiTbt6Months = MatrixType === "GenTbtMatrix" ? data.getNiTbt6Months   : data.getNiSA6Months
        SerTbt6Months = MatrixType === "GenTbtMatrix" ? data.getSerTbt6Months : data.getSerSA6Months
        // console.log("NAMES",data.getTechnicians_NI.map(td => td.id), data.getTbtList);



        /* *****************Following line to find out The TBT attended by a particular technician  *************   */
        var Techrows = dept === "NI" ? NiTbt6Months?.filter(tbt => tbt.id.find(id=> id === TechId) ) 
        :  
        SerTbt6Months.filter(tbt => tbt.id.find(id=> id === TechId) );
        // console.log("Techrows",Techrows, data);

        var TechrowsCopy = []
        
        for(var i in Techrows){
            let temp = {}
            Object.assign(temp, Techrows[i])
            // temp.id = "2433857457"
            TechrowsCopy.push(temp)
            // console.log("ROWS",  TechrowsCopy,Techrows[i]);
        }
        
        

        // Following lines arrange the matrix in the order of the list of TBT
        let table = []
        tbtList.forEach(topic => TechrowsCopy.find(tbt => {
            if(tbt.topic === topic)
            { table.push(tbt)}
        } 
             ));;
        // table = TechrowsCopy.filter(tbt => data.getTbtList.find(topic => tbt.topic === topic) );
        // console.log('***********',table);
        

        /* ********************* Following lines filters the duplicate toolbox talks by declaring a temp array in which table objects
        ,which consist of TBT Objects from Faunadb, are pushed one by one but before being pushed into it following lines first check 
        if this TBT is not a duplicate 
        ****************************************************************************************************** */

        const FinalTable = []
        {
        // console.table(table);
        const temp = []
        for(const t in table){
            if(!temp.includes(table[t].topic) ) { 
                FinalTable.push(table[t])
                temp.push(table[t].topic)
            }
            // console.log("TEMPORARY",temporary);
        }
        /************************************************************************** END OF FILTER CODE */


        
        /* ************** Following lines checks each tbt topic in list of TBT topic for each technician if technician 
        has attended that TBT it does nothing otherwise it wrties 'None' as date in TBT attendance column of matrix
        **************************************************************************************** */

        tbtList.map((topic,ind) => {
            if(FinalTable[ind]?.topic === topic) {
                return null
            }
            else{
                FinalTable.splice(ind,0,{date:"None"})
            }
        } ) 
        // console.log('Temporary',temporary, table);
    }
        /* *************************************************** END OF PUTTIGN NONE IN DATE COLUMNS FOR UN ATTENDED TBTS */
    
    return (
  <tbody>
      <tr>
      <th scope="row" style={{backgroundColor:'orange',color:'white'}}>{TechName} 
      <span className={Styles.TechnicianID}> {TechId} </span>  </th> 

      {FinalTable.map((tbt,ind) => {
        //   const diff=tbtList.findIndex(topic => topic === tbt.topic) 
        //   console.log("Tab Row",ind,temp,diff,diff - temp === 0);
          return (             
                  <td key={uuid()} style={{backgroundColor:'orange',color:'white'}}><span style={{display:'block'}}>{tbt.date}</span>{tbt.site}</td> 
          )
      })}
</tr>    
  </tbody>
    )}
}

export default Matrix
