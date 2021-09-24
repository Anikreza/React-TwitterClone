import React, {useState, useEffect} from 'react'
import firebase from 'firebase'
import moment from 'moment'
import db, {timestamp} from './firebase'

const MessageList = ({name, avatar}) => {

    const [users, setUsers]=useState([])
    const [text, setText]=useState([])

    useEffect(() => {

        db.collection("users").orderBy("time", "desc").onSnapshot((snapshot) =>
        
          setUsers(snapshot.docs.map((doc) =>(
            {
              id: doc.id,
              data: doc.data(),               
            }
          )))
        ); 


        db.collection("messages")
        .doc(name)
        .collection("texts")
        .orderBy("time", "asc")
        .onSnapshot((snapshot) => {
          setText(snapshot.docs.map((doc) => doc.data()));
        });
    }, [])


    
    return (
        <div className='list'>
            {
               
                users.map((u,i=0)=>(
                    <div>   
                          
                        <h2>{u.data.username===text[i]?.sender?<div>{u.data.username} <p>{text[i]?.message}</p></div>:''}</h2>
                    </div>
                ))
            }
          
        </div>
    )
}

export default MessageList
