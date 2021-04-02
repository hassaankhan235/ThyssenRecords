import React, {useState} from 'react'

import AutoSuggestinput from '../../pages/app/components/autoSuggestinput'
import Styles from './autocomp.module.css'

const AutoSuggestInputBox = (props) => {
    let result = []
    const [state, setState] = useState({name:'',id:'',suggest:[]})
    const {callback, index, technicians, setFlag, reuseable, labelName} = props
    console.log('TECHNICIANS & FLAG^^^^',flag, technicians);
    // reuseable === undefined ? true : reuseable
    var {flag} = props
    const{suggest} = state
    var {id,name} = state
    if(!reuseable)
    {
    result = technicians.map(a => a.name) /* to convert technicians object array([{name: id:}]) to technicians name array([names]) */
    }
    else
    {result = [...technicians]}
    flag ? name='' : name=name
    flag ? id='' :   id=id
    
    const guesssuggest = (e) => { 
        setFlag(false)
        const value = e.target.value
        setState(prevState => ({...prevState, name: value}))
        if (value.length > 0){
            const regex = new RegExp(`^${value}`, 'i' )
            // console.log('REGEXP', regex,result.sort());
            const guess = result.sort().filter(v => regex.test(v))
            // console.log("GUESSES", guess);
            setState(prevState => {
                return ({...prevState,suggest:guess})  })
        }
        else setState( prevState => ({...prevState, suggest:result, name:'',id:''}))
        return null
    }

    const renderSuggestion = () => {
        return(
            <div className='container-fluid'>
            <div className={` ${Styles.borderedSuggestion}` } >
                <ul className={Styles.ulist} >
            {suggest.map((s,i) => {
               return( 
                   <li key={technicians[i].id} className={Styles.text} onClick={() =>suggestionSelected(s)} 
                   onMouseOver={() =>suggestionSelected(s)} >{s}
                       </li>) 
            })}
            </ul>
            </div>
            </div>
        )
    }

    const suggestionSelected = (value) => {
        let Selectedindex = result.findIndex((val,i) => val === value )
        console.log('Name & Val HERE', value);
        setState({...state, name: value, id:technicians[Selectedindex].id})
        callback(index,value,technicians[Selectedindex].id)

    }
    
    const lostFocus = (e) => {
        if(e.keyCode === 27){
            const value = e.target.value
            // callback(index,name,value)
            setState(prevState => ({ ...prevState ,name:value , suggest:[]}))
        }
    }

    if(reuseable)
    {
     return (
     <div className={Styles.container}>
     <AutoSuggestinput value={name} name={name} disabled={false} onchange={guesssuggest} state={state} setState={setState}
     lostFocus={lostFocus} labelName={labelName}/>
     {renderSuggestion()}
     </div>
     )
    }
    else{
    return (
        <div className={Styles.container}>
        

        <AutoSuggestinput value={name} name={'name'} disabled={false} onchange={guesssuggest} lostFocus={lostFocus} 
        state={state} setState={setState} labelName={'Name'} />
    
      {renderSuggestion()}
      
      <AutoSuggestinput value={id} name={'id'} labelName={'ID / Iqama'}/>
      
      
        </div>
    )
    }
}

export default AutoSuggestInputBox
