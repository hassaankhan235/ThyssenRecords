import React, {useContext} from 'react'

import Layout from './layout/layout'
import IdentityContext from '../../IdentityContext'
import WelcomeCard from '../WelcomeCard'
import LoginCard from './app/components/LoginCard'
import CategoryWisepanel from '../Components/TBTAnalysisBoard/CategoryWisepanel'
import SearchCategoryForTech from '../Components/TBTAnalysisBoard/CatTech/SearchCategoryForTech'


const TBTAnalysisBoard = () => {

    const {user} = useContext(IdentityContext)

    return (
        <div className={`bg-secondary text-light`}>
        <Layout /> 
{user.email ? 
<>
<WelcomeCard /> 
<>
<div  style={{ marginLeft:'20px',float:'left', width:'30%'}}> 
 <CategoryWisepanel />
</div >
<div style={{ marginLeft:'20px',float:'left', width:'60%'}}>
 <SearchCategoryForTech />
 </div>
</>
</>
: 
<LoginCard />
}
</div>
    )
}

export default TBTAnalysisBoard
