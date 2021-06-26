import React, {useState} from 'react'
import './Tweetbox.css'
import a from './aa.jpg'
import {Avatar, Button} from '@material-ui/core'
import { GrEmoji } from 'react-icons/gr';
import { AiOutlineFileGif } from 'react-icons/ai';
import { BiPoll } from 'react-icons/bi';
import { BsImage } from 'react-icons/bs';
import {MdSchedule } from 'react-icons/md';
import db from './firebase'



function Tweetbox () {

    const [tweet, setTweet]= useState(" ");
    const [image, setImage]=useState(" ");

    const postTweet = (e) =>{
        e.preventDefault(); 
        db.collection('posts').add({
            displayname:"SeaHawk",
            username:"@22ndSeaHawk",
            avatar: 'https://scontent.fcgp17-1.fna.fbcdn.net/v/t1.6435-9/151205961_1904845516357802_3308911151071232396_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=3Sjm3zLUnxUAX-qB2u7&_nc_ht=scontent.fcgp17-1.fna&oh=c9d7980ed26a8197abd51983faf57d2d&oe=60DC56D2',
            image: image,
            verification: false,
            text: tweet,
        });
        setTweet("");
        setImage("");
    }
    

    return (
        <div className='tweetbox'>
            <form>
                <div className='tweetboxInput'>
                 <Avatar src={a}/> 

                 <input 
                  onChange ={e=>setTweet(e.target.value)} 
                  placeholder="what's happening?"
                  type='text' />              
                </div>

                <input
                     
                     onChange={(e) => setImage(e.target.value)}
                     className="tweetBox-imageInput"
                     placeholder="Enter image URL"
                     type="text"
                />



                <div className='tweetbox-ico'>          
                <BsImage   size={25}/>    
                <AiOutlineFileGif size={25}/>
                <BiPoll size={25} />
                <GrEmoji size={25}/>
                <MdSchedule size={25}/>
               
                </div>
                <Button onClick={postTweet} className='tweetbox-button'> Tweet</Button>
            </form>
        </div>
    )
}

export default Tweetbox
