import React, {useState} from 'react'

const MenuContext = React.createContext({})

const MenuProvider = props => {
    const [showMenu, setShowMenu] = useState(false)


return(
    <MenuContext.Provider value={{Menustatus: showMenu, SetMenuContext: setShowMenu}}>
        {props.children}
    </MenuContext.Provider>
)
}

export default MenuContext
export {MenuProvider}
