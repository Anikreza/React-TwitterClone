import React, {useState, useEffect, useRef} from 'react'
import './Tweetbox.css'
import a from './aa.jpg'
import {Avatar, Button} from '@material-ui/core'
import { GrEmoji } from 'react-icons/gr';
import { AiOutlineFileGif } from 'react-icons/ai';
import { BiPoll } from 'react-icons/bi';
import { BsImage } from 'react-icons/bs';
import {MdSchedule } from 'react-icons/md';
import {ImCross } from 'react-icons/im';
import db from './firebase'
import {storage, timestamp} from './firebase'
import firebase from 'firebase';
import TextareaAutosize from 'react-textarea-autosize';
import { BounceLoader, BeatLoader, BarlLoader } from 'react-spinners'


function Tweetbox ({avatar, name}) {

    
    const re =useRef();  
    const [tweet, setTweet]= useState(null);
    const [image, setImage]=useState("");
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);   
    const [loading, setLoading]=useState()
    const nameu=  `@${name}`; 
    const disabled='';

     
    const setTweetData =(e)=>{
        setTweet(e.target.value); 
       
    }

    
    function removeimage(){
      setImage('');
    }

    const postTweet =() =>{  
      
      setLoading(true)
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
              like:0,
            });

              setTweet(""); 
              removeimage(); 
              setLoading(false)   
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

    return (
        <div className='tweetbox'>
         
            <form onSubmit={(e=> e.preventDefault())}>
                <div className='tweetboxInput'>
                 <Avatar src={avatar} style={{height:'50px', width:'50px'}}/> 
               
     
                    <TextareaAutosize
                       className='auto_height'
                       value={tweet} 
                       onChange ={setTweetData}  
                       placeholder="What's happening?" 
                       minRows={3}
                       maxRows={20}
                    />                          
                </div>


                {
                  loading?
                  <div style={{float:'left', marginLeft:'40%'}}>
                   <BeatLoader  className='loader-position' size={40} color={'grey'}/> 
                  </div>
                  :
                  <div>      
                     <a className={image?'image-cross':'hdn'} onClick={removeimage}> 
                       <ImCross/>
                   </a> 
                  </div>

                }

                   
                 <div className={image?'show-image':'hdn'}>
                    <img src={url}/>  
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
                <Button disabled={tweet || image? disabled:!disabled} onClick={postTweet} className={tweet || image?'tweetbox-button-glow':'tweetbox-button'}> Tweet</Button>
            </form>


            <div>

            </div>
           
        </div>
    )
}

export { Tweetbox as default};
