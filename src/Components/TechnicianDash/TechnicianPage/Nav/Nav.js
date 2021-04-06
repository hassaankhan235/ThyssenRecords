import React, { useState } from 'react'

function Nav(props) {

    const {ShowAlert} = props
    const [Firsttab, setTab] = useState(true)
    const changeTab = () => {
        console.log("TABBED");
        ShowAlert()
        setTab(prevState => !prevState)
    }
    
    return (
        <div>
            <ul class="nav nav-pills">
  <li class="nav-item" onClick={() => changeTab()}>
    <a class= {`nav-link ${Firsttab ? 'active' : 'text-light'}`}  href="#">TBTs</a>
  </li>
  <li class="nav-item" onClick={() => changeTab()}>
    <a class= {`nav-link ${!Firsttab ? 'active' : 'text-light'} `} href="#">Alerts</a>
  </li>
</ul>
        </div>
    )
}

export default Nav
