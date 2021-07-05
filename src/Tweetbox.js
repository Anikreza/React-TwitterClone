import React, {useState, useEffect, useRef} from 'react'
import './Tweetbox.css'
import a from './av.jpg'
import {Avatar, Button} from '@material-ui/core'
import { GrEmoji } from 'react-icons/gr';
import { AiOutlineFileGif } from 'react-icons/ai';
import { BiPoll } from 'react-icons/bi';
import { BsImage } from 'react-icons/bs';
import {MdSchedule } from 'react-icons/md';
import db from './firebase'
import {storage, timestamp} from './firebase'
import moment from 'moment'



function Tweetbox () {

    const re =useRef()


    
    const [tweet, setTweet]= useState(" ");
    const [image, setImage]=useState(" ");
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [timeStamp,setTimestamp]=useState("");
    const [progress, setProgress] = useState(0);

    const getre=()=>{
      let d= re.current.style.display="none"
      console.log(d);
      setTweet(" ");
    }

    const postTweet =() =>{
        
       
        db.collection('posts').add({
            displayname:"Tanvir Reza Anik",
            username:"@TanvirRezaAnik1",
            avatar: 'https://scontent.fcgp17-1.fna.fbcdn.net/v/t1.6435-9/151205961_1904845516357802_3308911151071232396_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=LLbvfeotRxIAX8QBA7P&_nc_ht=scontent.fcgp17-1.fna&oh=7db596091b8245ce71c1360b9cfda91b&oe=60E83452',
            image: url,
            verification: false,
            text: tweet,
            time:timeStamp,
            like:'',
        });    
        setImage(" ");
    }

    
   const handlechange = async (e) =>{
            if(e.target.files[0]){
                setImage(e.target.files[0])
            }   
            else{
              setImage(null);
              setError('Please select an image file');
            }
            storageRef.put(image).on('state_changed', (snap) => {
              let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
              setProgress(percentage);
            }, (err) => {
              setError(err);
            }, 
          async () => {
        
          let url = await storageRef.getDownloadURL();   
          const createdAt = timestamp(); 
            setUrl(url);
            setTimestamp(createdAt);                  
        }            
      );
      
                     
   }
   console.log("image:", image.name)
   const storageRef = storage.ref(`images/${image.name}`);
 
   const handleTweet=()=>{
    postTweet()
    getre()
   }
 
    return (
        <div className='tweetbox'>
            <form>
                <div className='tweetboxInput'>
                 <Avatar src={"https://scontent.fcgp17-1.fna.fbcdn.net/v/t1.6435-9/151205961_1904845516357802_3308911151071232396_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=LLbvfeotRxIAX8QBA7P&_nc_ht=scontent.fcgp17-1.fna&oh=7db596091b8245ce71c1360b9cfda91b&oe=60E83452"}/> 

                 <input 
                  onChange ={e=>setTweet(e.target.value)} 
                  placeholder="what's happening?"
                  type='text' /> 
                  
                               
                </div>

                <div className='tweetbox-ico'> 
                <label htmlFor="fileinput">  <BsImage   size={25} style={{cursor:"pointer"}}/> </label>                        
                <input         
                     onChange={handlechange}
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
                <img ref={re}  src={url} style={{maxHeight:"350px"}} />   
                <Button  onClick={handleTweet} className='tweetbox-button'> Tweet</Button>
                
                       
               
            </form>
        </div>
    )
}

export { Tweetbox as default};
