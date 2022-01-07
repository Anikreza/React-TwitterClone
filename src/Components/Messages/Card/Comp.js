import React, {useState,useRef, useEffect} from 'react'
import db, {timestamp} from '../../../Database/firebase'
import firebase from 'firebase'
import {Avatar} from '@material-ui/core'

const Comp = ({user,image,name}) => {

    const [User,setUser]=useState('')
    const [From,setFrom]=useState('')

    useEffect(() => {
        console.log(User)
    }, [User])

    function sendToWhere(usr,name){

        setUser(usr)
        db.collection('to').doc(name).set({
            to: usr,
          })

        setFrom(name)
        db.collection('from').doc(name).set({
            from: name,
          })
    }
    return (
        <div className='select-chat'>
           <br/> 
            <Avatar className='select-chat-avatar' src={image}/>
          <div className='chats-flex'>  
          <br/> 
          <p onClick={()=>sendToWhere(user,name)}>{user} </p> 
          </div>
        </div>
    )
}

export default Comp
