const handleSelect = (val, tbtDetails,SettbtDetails) => {
      console.log('Working', tbtDetails);

      SettbtDetails(prevState => {
          let copy = [...prevState]
          copy[0].category = val
          return copy
        })
        console.log('Working',tbtDetails);
      
}

exports.handleSelect = handleSelect;