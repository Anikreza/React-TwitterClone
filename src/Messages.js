import React, {useState,useRef, useEffect} from 'react'
import './messages.css'
import db, {timestamp} from './firebase'
import {Avatar} from '@material-ui/core'
import { BrowserRouter as Router,Switch, Route, NavLink,Link} from 'react-router-dom';
import Chatbox from './Chatbox'
import InputEmoji from "react-input-emoji";
import firebase from 'firebase'
import { MdClose } from 'react-icons/md';
import MessageList from './MessageList'
import Comp from './Comp'
import MessageComp from './MessageComp'
import MessageCompR from './MessageCompR'
import moment from 'moment'


const Messages = ({name, avatar, email}) => {

    const [Chatdata, setChatData]=useState([])
    const [messages, setMessages]=useState('')
    const [Avtr, setAvatr]=useState(avatar)
    const [text, setText]=useState([])
    const [recieve, setRecieve]=useState([])
    const [search, setSearch]=useState('')
    const [SEND, setSEND]=useState('')
    const [from, setFrom]=useState('')
    const [avt, setAvatar]=useState('')
    const [users, setUsers]=useState([])
    const [open, setOpen]=useState(false)
    const [chat, setChat]=useState(false)


    useEffect(() => {
        getUsers()

      db.collection("to")
      .doc(name)
      .onSnapshot((snapshot) => {
        setSEND(snapshot.data()?.to);
      });

      db.collection("from")
      .doc(name)
      .onSnapshot((snapshot) => {
        setFrom(snapshot.data()?.from);
      });
    }, [users])

    useEffect(() => {
        getMsg()
    }, [])


    useEffect(() => {
      const ChatData=[...text,...recieve]
      setChatData(ChatData)
      
    }, [text,recieve])

 

    const send = () => {
      if(!messages) return
  
      db.collection('messages').doc(SEND).collection('recieved').add({
        message: messages,
        sender: name,
        reciever:SEND,
        avatar:avt,
        email:email,
        time: firebase.firestore.FieldValue.serverTimestamp(),   
      });


      db.collection('messages').doc(name).collection('sent').add({
        message: messages,
        sender: name,
        reciever:SEND,
        avatar:avt,
        email:email,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        
      });

      setMessages('');
    };

    
    
    function getMsg(){

        db.collection("messages").doc(name).collection('recieved').orderBy("time", "asc").onSnapshot((snapshot) =>
        
        setText(snapshot.docs.map((doc) =>(
          {
            id: doc.id,
            data: doc.data(),               
          }
        )))
      ); 

        db.collection("messages").doc(name).collection('sent').orderBy("time", "asc").onSnapshot((snapshot) =>
        
        setRecieve(snapshot.docs.map((doc) =>(
          {
            id: doc.id,
            data: doc.data(),               
          }
        )))
      ); 
    }


 
    function getUsers(){
        db.collection("users").onSnapshot((snapshot) =>          
        setUsers(snapshot.docs.map((doc) =>(
        {
            id: doc.id,
            data: doc.data(),               
        }
        )))
    ); 
    console.log(Chatdata)

    }

    const searchhandler=(e)=>{
        e.preventDefault();
        setSearch(e.target.value)
        const user=users.filter(u=>{
            return u.data.username.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        })

        if (search==='') {
            getUsers()
            }
            else{
            setUsers(user);
            }     
    }



     function setchat(avatarr){
        setOpen(!open)
        setChat(true)
        setAvatar(avatarr)
    }

    function closemodal(){
        setOpen(!open)
        setChat(false)
    }

    
    return (
        <div className='messages'>
            <div className='flex-message'>

                <div className='message-box'>
                    <h4>Messages</h4>
                     
                   <MessageList name={name} avatar={avatar}/>
                </div>

                <div className={!chat?'users-box':'hide-modal'}>
                    <h2>You don’t have a message selected</h2>     
                    <p>Choose one from your existing messages, or start a new one.</p>
                    <br/>
                    <button className='message-select-button' onClick={()=>setOpen(!open)}> New Message</button>               
                  
                    <div className={open?'message-modal':'hide-modal'}> 
                       <MdClose onClick={closemodal} style={{cursor:'pointer'}} size='30px'/>
                        <br/>
                        <form onSubmit={()=>setSearch('')}></form>
                        <input type='text' placeholder='Search People...' value={search} onChange={searchhandler}/>
                         <hr style={{height:'1px'}}/>  
                         <br/>  

                         <h5 className='h5'>Select an user to start conversation</h5>  
                               <div >
                              
                            {
                                users.map(u=>(
                                  <div onClick={()=>setchat(u.data.avatar)}>  
                                   <Comp 
                                    name={name}
                                    user={u.data.username} 
                                    image={u.data.avatar} 
                                 />
                                  </div>
    
                               
                                ))
                            } 
                              </div>  
                                              
                    </div>
                    <div className={open?'overlay':'hide-modal' }></div>
                </div>


             <div className={chat?'chatbox':'hide-modal'}>
                   <div className='wrap-chat'>
                      <div className='chat-header'>
                          <div className='flex-message'>
                                
                                <h2><Avatar src={avt}/></h2>
                                <h3>{SEND}</h3>        

                          </div>
                          <p1 className='username-msgs'>{`@${SEND}_${14}`}</p1>
                            <br/>
                            <hr style={{width:'550px'}}/>
                      </div> 

                      <div className='chat-middle'>
                          <div className='chat-middle-info'>          
                             <h2>{SEND}</h2>        
                             <p>This is a random bio set by the developer himself, for test purpose</p>
                             <p>Info below are fake too</p>

                             <div className='flex-this'>
                                    <p> <p1>100</p1> Following</p>
                                    <p> <p1>1200</p1> Followers</p>
                             </div>
                                <p>Joined On {12}'th January 20{20}</p>
                          </div>
                      </div> 
                      <hr/>
                      <div className='message-body'>
                             <hr/> 
                             <div className='text'>                
                                 {Chatdata.map(mes=>(  
                                  mes.data.reciever===SEND && mes.data.sender===from || mes.data.reciever===from && mes.data.sender===SEND?
                                    <MessageComp
                                    message={mes.data?.message}
                                    time={mes.data?.time}
                                    to={SEND}
                                    sender={mes.data?.sender}
                                    reciever={mes.data?.reciever}
                                    name={name}
                                    avatar={mes.data.avatar}
                                 />
                                 :
                                 ''
      

                                ))}
                          </div>
                    
                        </div>

                     </div>  
                     <div className='pad-left'>
                         <InputEmoji
                              value={messages}
                              onChange={setMessages}
                              cleanOnEnter
                              onEnter={send}
                              placeholder="Type a message..."
                              borderRadius='20'
                            /> 
                     </div>
 
                 </div>  
             
 


            </div>
        </div>
    )
}

export default Messages
