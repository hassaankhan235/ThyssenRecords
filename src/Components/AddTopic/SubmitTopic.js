import { useMutation } from '@apollo/client'
import React from 'react'
import gql from 'graphql-tag';

function SubmitTopic(props) {

    const WRITE_TBT_TOPIC = gql`
    mutation writetbtTopic($topic:String, $type:String){
        writeTbtTopic(topic: $topic, type:$type)
    }
    `

    const WRITE_SA_TOPIC = gql`
    mutation writesaTopic($topic:String, $type:String, $date:String, $location:String){
        writeSaTopic(topic: $topic, type:$type, date:$date , location:$location)
    }
    `
    
    const {topicDetails, tbtType, reset} = props
    const [writeTbtTopic] = useMutation(WRITE_TBT_TOPIC)
    const [writeSaTopic]  = useMutation(WRITE_SA_TOPIC)
    console.log("IN SUBMIT", topicDetails, tbtType);

    const handleSubmit = async(e) => {
        e.preventDefault()
        tbtType === "TBT" ?
        await writeTbtTopic({variables:{
            topic:    topicDetails.topic,
            type:      topicDetails.type
        }})
        :
        await writeSaTopic({variables:{
            topic:    topicDetails.topic,
            type:      topicDetails.type,
            date:      topicDetails.date,
            location:  topicDetails.location
        }})
        reset()
        console.log('Submitted');
    }

    return (
        <div style={{display:'flex'}}>
        <input className='btn btn-primary ml-auto mb-3' type='submit' value='Save' onClick={e => handleSubmit(e)}
        style = {{backgroundColor:'orange', border:'0px',width:'200px'}}/>
        </div>
    )
}

export default SubmitTopic
