import React from 'react'

import Styles from './menu.module.css'

function MenuCar() {

  
  
    return (
            <div className={Styles.menu} >
        <ul className={Styles.Menul}>
                <h4> Hassaan Khan </h4>
                <hr style={{color:'black',border:'2px solid white'}}/>
            <li className={Styles.menuli}>
          <a className={Styles.menulink} href="../../AddTechnicians"> Add Technicians </a>
        </li>
            <li className={Styles.menuli}> Add Toolbox Topics </li>
            <li className={Styles.menuli}>
          <a className={Styles.menulink} href="../../AddTbt"> Add Toolbox </a>
        </li>

        <li className={Styles.menuli}>
          <a className={Styles.menulink} href="../../MatrixControl"> Toolbox Matrix </a>
        </li>
        </ul>
      </div>
        
    )
}

export default MenuCar
