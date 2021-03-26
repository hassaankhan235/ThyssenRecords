import React from 'react'

function TableHead(props) {
  
  const {tbtList} = props
    return (
  <thead>
    <tr>
    <th scope="col" style={{backgroundColor:'blueviolet',color:'white'}}> Name </th>
      {tbtList.map(topic => {
          return (<th key={topic} scope="col" style={{backgroundColor:'blueviolet',color:'white'}}> {topic} </th>)
      })}
    </tr>
  </thead>
    )
}

export default TableHead
