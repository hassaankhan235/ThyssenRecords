import React from 'react'
import { gql, useQuery } from '@apollo/client'
import LoginCard from './components/LoginCard';

function Matrix() {
    
    const READ_QUERY = gql`
    {
        getNiTbt6Months{
            topic
            site
            date
            id
        }
        getSerTbt6Months{
            topic
            site
            date
            id
        }
        getTechnicians_NI{
            name
            id
            company
        }
        getTechnicians_SER{
            name
            id
            company
        }
    }
    `;

    const Logi = (tbt) => {
        tbt.id.map(id => id === "2433857457")
    }

    const {loading, error, data} = useQuery(READ_QUERY)

    if(loading) return 'loading'

    
    else if(data){
        console.log("NAMES",data.getTechnicians_NI.map(td => td.id));
        // Following function to find out The TBT attended by a particular technician
        console.log("TBT",data.getSerTbt6Months.find(tbt => tbt.id.find(id=> id === "2433857457") ));
    return (
      <div>Matrix</div>
    )}
}

export default Matrix
