import React, {useState} from 'react'
import './Post.css'
import av from './av.jpg'
import z from './z.jpg'
import {Avatar} from '@material-ui/core'
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import { GoVerified } from 'react-icons/go';
import Modal from './Modal'
import Comfeed from './Comfeed'
import db, { timestamp } from './firebase'


function Post({displayname, username, verification, time, text, image, avatar, like}) {
   
    const [countera, setcountera]= useState(0); 
    const [liked, isLiked]=useState(false)

    const counterhandlera = ()=>{
        isLiked(true); 
        if(liked){
            setcountera(countera-1);
            isLiked(false)
        }
        else{
            setcountera(countera+1);
        }
        
       
    }
    
    const [tweet, setTweet]= useState(" ");
    const postTweet = (e) =>{
        e.preventDefault(); 
        db.collection('posts').add({
            displayname:displayname,
            username:username,
            avatar: avatar,
            image: image,
            verification: verification,
            text: text,
            time:time,
            like:countera, 
        });
        setTweet(" ");
      
    }
    
  
  
    return (
        <div className='post'>
            <div className='post-avatar'>
                <Avatar src={avatar}/>
            </div>
            <div className='post-body'>
                <div className='post-header'>
                    
                    <div className='post-header-text'>
                        <h3> {displayname}{" "} <span className="post__headerSpecial">
                             {verification &&< GoVerified className='post__badge'/>}
                              {username} {`. `}</span>
                       </h3>
                    </div>
                    <div className='post-header-description'>
                         <p>{text}</p>
                    </div>
                </div>
                 <img src={image}/>
                 <div className='post-footer'>
                 <Comfeed/> 
                 <RepeatIcon onClick={postTweet}  fontSize="small" />        
                 <FavoriteBorderIcon onClick={counterhandlera} fontSize="small" />           
                 <PublishIcon fontSize="small" />                       
                 </div>
                 <div className='move'><p3> {countera} </p3></div>
                
            </div>
           
        </div>
    )
}

export { Post as default };
