import React, {useState, useEffect} from 'react'
import '../../../Style/Post.css'
import {Avatar} from '@material-ui/core'
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import PublishIcon from "@material-ui/icons/Publish";
import { GoVerified } from 'react-icons/go';
import { FiDelete } from 'react-icons/fi';
import Modal from '../../Comments/Modal'
import ComBox from '../../Comments/ComBox'
import db, { timestamp } from '../../../Database/firebase'
import moment from 'moment'
import { SettingsBackupRestore } from '@material-ui/icons'
import firebase from 'firebase'

function Post({displayname, username, verification, time, text, image, avatar, postid, name, avatarr, reply, who,like}) {
   
    const [counter, setcounter]= useState(like); 
    const [liked, isLiked]=useState(false)
    const [isActive, setActive] = useState(true);
    const [isActivec, setActivec] = useState(true);

    const toggleClass = () => {
      setActive(!isActive);
    };


    const counterhandler = ()=>{
        setActive(!isActive);
        isLiked(true); 
        
        if(liked){
            setcounter(counter-1);
            isLiked(false)
        }
        else{
            setcounter(counter+1);
        }


        db.collection('posts').doc(postid).update({
            like:counter, 
        });
        console.log('this is like:',like)
    }


    const [tweet, setTweet]= useState(" ");

    const postTweet = (e) =>{
        
        e.preventDefault(); 
        if(displayname!==name){
        db.collection('posts').add({
            displayname:name,
            username:username,
            avatar: avatarr,
            image: image,
            verification: verification,
            text: text,
            time:firebase.firestore.FieldValue.serverTimestamp(),
            like:0, 
        });
         
                db.collection('notifications').doc(displayname).collection('notification').add({
                notification: `${name} Re-tweeted your tweet`,
                enable: true,
                time: firebase.firestore.FieldValue.serverTimestamp()
            });
          }
          else{
              window.alert('You cant retweet your own tweet');
          }  

        setTweet(""); 
        setActivec(!isActivec);
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
                        <h3> {displayname}{""} <span className="post__headerSpecial">
                             {verification && <GoVerified />}
                              {username} {moment(time?.toDate()).startOf("minute").fromNow()}</span>
                       </h3>
                    </div>
                    <div className='post-header-description'>
                          <p>{reply} <span className='spanwho' color='#00a2ff'>{who}</span></p>
                          <br/>
                         <p>{text}</p>
                    </div>
                </div>
                 <img src={image}/>
                 <div className='post-footer'>
                 <ComBox  name={name} displayname={displayname} postusername={username} postid={postid} avatar={avatar} useravatar={avatarr} image={image} time={time} text={text}/> 
                 <RepeatIcon  className={!isActivec? 'repeat-c': 'repeat-bw'} onClick={postTweet}  fontSize="small" />        
                 <FavoriteTwoToneIcon  className={!isActive? 'love-c': 'love-bw'} onClick={counterhandler} fontSize="small" />         
                 <PublishIcon fontSize="small" onClick={()=> window.alert('Under Developement')}/>                       
                 </div>
                  {
                      like>0?
                      <div className='move'><p3> {like} </p3></div>
                      :
                      <div>

                      </div>
                  }
                 
                
            </div>
           
        </div>
    )
}

export { Post as default };
