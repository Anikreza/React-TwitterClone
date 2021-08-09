import React, {useState, useEffect, useRef} from 'react'
import './Tweetbox.css'
import a from './aa.jpg'
import {Avatar, Button} from '@material-ui/core'
import { GrEmoji } from 'react-icons/gr';
import { AiOutlineFileGif } from 'react-icons/ai';
import { BiPoll } from 'react-icons/bi';
import { BsImage } from 'react-icons/bs';
import {MdSchedule } from 'react-icons/md';
import db from './firebase'
import {storage, timestamp} from './firebase'
import moment from 'moment'
import firebase from 'firebase';
import TextareaAutosize from 'react-textarea-autosize';



function Tweetbox ({avatar, name}) {

    
    const re =useRef() 
    const [tweet, setTweet]= useState("");
    const [image, setImage]=useState(" ");
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [timeStamp,setTimestamp]=useState("");
    const [progress, setProgress] = useState(0);   
    const nameu=  `@${name}`; 


    const postTweet =() =>{       
        storageRef.put(image).on(
          "state_changed",
          (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
          },
          (err) => {
            setError(err);
          },  
          async () => {
            db.collection('posts').add({
              displayname: name,
              username: nameu,
              avatar: avatar,
              verification: false,
              image: url,
              text: tweet,
              time:firebase.firestore.FieldValue.serverTimestamp(),
              like:'',
            });
              setUrl(null);
              setTweet("");     
          }          
        );      
    }

  


    const filehandler = async (e) => {
      const file = e.target.files[0];
      if (file) {
        let reader = new FileReader();
  
        await setImage(file);
        reader.onloadend = () => {
          setUrl(reader.result);
        };
  
        reader.readAsDataURL(file);
      } else {
        setImage(null);
        setError("Please select an image file");
      }   
    };                 
   const storageRef = storage.ref(`images/${image.name}`);

   function auto_height(e) {  /* javascript */
    e.style.height = "1px";
    e.style.height = (e.scrollHeight)+"px";
}

    return (
        <div className='tweetbox'>
            <form onSubmit={(e=> e.preventDefault())}>
                <div className='tweetboxInput'>
                 <Avatar src={avatar} style={{height:'50px', width:'50px'}}/> 
               
     
                    <TextareaAutosize
                       className='auto_height'
                       value={tweet} 
                       onChange ={e=>setTweet(e.target.value)} 
                       placeholder="What's happening?" 
                       minRows={3}
                       maxRows={20}
                    />                          
                </div>

                <div className='tweetbox-ico'> 
                <label ref={re}  htmlFor="fileinput">  <BsImage   size={25} style={{cursor:"pointer"}}/> </label>                        
                <input         
                     onChange={filehandler}
                     className="tweetBox-imageInput"
                     id="fileinput"
                     type="file"
                     style={{display:"none"}}        
                />                                                 
                <AiOutlineFileGif size={25}/>
                <BiPoll size={25} />
                <GrEmoji size={25}/>
                <MdSchedule size={25}/>

                </div>           
                <img  src={url} style={{maxHeight:"350px"}} /> 
              
                <Button  onClick={postTweet} className='tweetbox-button'> Tweet</Button>
               
            </form>
           
        </div>
    )
}

export { Tweetbox as default};
