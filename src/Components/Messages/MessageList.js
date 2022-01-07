import React, {useState, useEffect} from 'react'
import firebase from 'firebase'
import moment from 'moment'
import db, {timestamp} from '../../Database/firebase'
import {Avatar} from '@material-ui/core'

const MessageList = ({name, avatar, send}) => {

    const [users, setUsers]=useState([])
    const [text, setText]=useState([])
    const [sent, setSent]=useState([])

    useEffect(() => {

        db.collection("users").orderBy("time", "desc").onSnapshot((snapshot) =>
        
          setUsers(snapshot.docs.map((doc) =>(
            {
              id: doc.id,
              data: doc.data(),               
            }
          )))
        ); 
        db.collection("messages").doc(name).collection('chat').orderBy("time", "asc").onSnapshot((snapshot) =>
        
        setText(snapshot.docs.map((doc) =>(
          {
            id: doc.id,
            data: doc.data(),               
          }
        )))
      ); 
        db.collection("messages").doc(send).collection('chat').orderBy("time", "asc").onSnapshot((snapshot) =>
        
        setSent(snapshot.docs.map((doc) =>(
          {
            id: doc.id,
            data: doc.data(),               
          }
        )))
      ); 
    }, [])


    
    return (
        <div className='list'>
            {
               
                users.map((u,i)=>(
                    <div>   
                                  
                        {u.data.username===text[i]?.data.reciever && i<1?
                        <div>
                          
                          <p>{text[text.length-1]?.data.message}</p>
                          <p>{sent[i]?.data.sender} </p>
                          <Avatar src={text[text.length-1]?.data.avatar}/>

                        </div>
                           :
                           ''
                        }
                      
                    </div>
                ))
            }
          
        </div>
    )
}

export default MessageList
