import React, {useState} from 'react'
import Modal from './Modal'
import db from './firebase'
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import firebase from 'firebase';
import { Avatar } from '@material-ui/core';
import './combox.css' 
import moment from 'moment'
import { GoVerified } from 'react-icons/go';
import TextareaAutosize from 'react-textarea-autosize';


const ComBox = ({name, postusername, avatar, time, text, useravatar,displayname}) => {

  
  const [comment, setComment]=useState('')
  const rep='Replying to';
  const nameu=  `@${name}`;  
  const [isActive, setActive] = useState(true);
  const [isOpen, setIsOpen] = useState(false)
  
  const toggleClass = () => {
    setActive(!isActive);
  };

    const postComment = (e) =>{
      
        e.preventDefault(); 

        db.collection('posts').add({
            displayname:name,
            username:nameu,
            avatar: useravatar,
            reply:rep,
            image:'',
            who:postusername,
            like:0,
            verification:'',
            text: comment,
            time:firebase.firestore.FieldValue.serverTimestamp(),  
        });

        db.collection('notifications').doc(displayname).collection('notification').add({
          notification: `${name} Replied To you: ${comment}`, 
          enable: true,
          time: firebase.firestore.FieldValue.serverTimestamp(), 
      });
          setComment(''); 
          setIsOpen(false)
        console.log(rep)
    }

    
    

    return (
        <div  >
               <ChatBubbleOutlineIcon className={!isActive? 'com-c': 'com-bw'} fontSize="small" onClick={() => setIsOpen(true)}/>
                 <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                   <div className='post-summery'>
                      <div className='user-summery'>
                           <Avatar src={avatar}/>
                           <p2>{postusername}</p2>
                           <GoVerified color='grey' style={{marginTop:'15px', padding:'1px'}}/>
                           <p1>{moment(time?.toDate()).startOf("minute").fromNow()}</p1>
                      </div>
                      <p>{text}</p> 
                    
                      <br/>
                       <p5>Replying to <p4>{postusername}</p4></p5>
                       <br/>  
                   </div>
                   
                   
                   <div className='tweet-reply'>
                       <Avatar className='reply-avatar' src={useravatar}/>
                        <form className='comment-input' onSubmit={(e)=>e.preventDefault()}>

                            <TextareaAutosize
                              className='auto_height'
                              onChange ={e=>setComment(e.target.value)} 
                              placeholder="Tweet your reply"
                              value={comment}
                              type='text'
                              minRows={1}
                              maxRows={5}
                           />   
                        </form> 
                       
                   </div>
                   <button className='btn' onClick={postComment} > Reply </button> 
                </Modal>

               






       
        </div>

       
        
    )
}

export default ComBox
