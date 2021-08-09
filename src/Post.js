import React, {useState, useEffect} from 'react'
import './Post.css'
import av from './av.jpg'
import z from './z.jpg'
import {Avatar} from '@material-ui/core'
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import { GoVerified } from 'react-icons/go';
import { FiDelete } from 'react-icons/fi';
import Modal from './Modal'
import ComBox from './ComBox'
import db, { timestamp } from './firebase'
import moment from 'moment'
import { SettingsBackupRestore } from '@material-ui/icons'

function Post({displayname, username, verification, time, text, image, avatar, postid, name, avatarr}) {
   
    const [countera, setcountera]= useState(0); 
    const [liked, isLiked]=useState(false)
    const [sure, setSure]=useState(false)
 
   
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
    //const [id,setId]=useState();
   // useEffect(() => {
    //    db.collection("posts").onSnapshot((snapshot) =>
       // setId(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))  )   
      //  setId(snapshot.docs.map((doc) => (doc.id)))        
      //  ); 
    //  }, []);

    useEffect(() => {
        console.log('this is postid:',postid)
    }, [])

    const [tweet, setTweet]= useState(" ");
    const postTweet = (e) =>{
        e.preventDefault(); 
        db.collection('posts').add({
            displayname:name,
            username:username,
            avatar: avatarr,
            image: image,
            verification: verification,
            text: text,
            time:time,
            like:countera, 
        });
        setTweet(" "); 
    }
   
  function remove(){
       
      if(window.confirm('Press OK To Delete The Post')){
        db.collection("posts").doc(postid).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
      }
 
  }
  
    return (
        <div className='post'>
            <div className='post-avatar'>
                <Avatar src={avatar}/>
            </div>
            <div className='post-body'>
                <div className='post-header'>
                     <FiDelete 
                     className={`delete-icon ${ name !==displayname && "delete-hidden"}`} 
                               onClick={remove} size='25px'color='#543c42'
                    />
                    <div className='post-header-text'>
                        <h3> {displayname}{" "} <span className="post__headerSpecial">
                             {verification &&< GoVerified className='post__badge'/>}
                              {username} {moment(time?.toDate())
                                 .startOf("minute")
                             .fromNow()}</span>
                       </h3>
                    </div>
                    <div className='post-header-description'>
                         <p>{text}</p>
                    </div>
                </div>
                 <img src={image}/>
                 <div className='post-footer'>
                 <ComBox name={name} postusername={username}/> 
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
