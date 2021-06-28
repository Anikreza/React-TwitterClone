import React, {useState} from 'react'
import './Tweetbox.css'
import a from './av.jpg'
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
            displayname:"ZainFariha",
            username:"@ZainFariha1",
            avatar: 'https://scontent.fcgp17-1.fna.fbcdn.net/v/t1.6435-9/204147205_1999760643532955_766980169181937121_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=730e14&_nc_ohc=_vIHAT-dUn4AX8B5bZp&_nc_ht=scontent.fcgp17-1.fna&oh=40d6f22c44925c65d2e4ed36d18b3ad9&oe=60DE97F2',
            image: image,
            verification: false,
            text: tweet,
            like:'1',
        });
        setTweet(" ");
        setImage(" ");
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
                     onChange={e => setImage(e.target.value)}
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
