import React from 'react'

function Pagination(props) {

    {   /* ********************************************************************************************************
        This is pagination it increases pagination state by a value of 5 every time Next button is pressed until
        the state value reaches the total number of TBTS
        **********************************************************************************************************/}

    const {totPages, NextPagination, currentPagination} = props
    return (
        <div>
        <nav aria-label="Page navigation example">
        <ul class="pagination d-flex">
      
        <a className="mr-auto" onClick={() => NextPagination(prevState => {
          if ( prevState - 5 < 0 )
          {return 0}
          else
          {return prevState - 5}
          })} href="#">
           <span style={{color: currentPagination === 0 ? 'red': 'green'}}> Previous </span>
      </a>


      <a className="ml-auto" onClick={() => NextPagination(prevState => {
          if ( prevState + 5 > totPages.length )
          {return totPages.length}
          else
          {return prevState + 5}
          })} href="#">
           <span style={{color: currentPagination === totPages.length ? 'red': 'green'}}> Next </span>
      </a>
          
      </ul>
        </nav>
        </div>
    )
}

export default Pagination
