import React, {useState, useEffect} from 'react'
import './Feed.css'
import Tweetbox from './Tweetbox'
import Post from './Post'
import Comfeed from './Comfeed'
import a from './a.jpg'
import aa from './aa.jpg'
import z from './z.jpg'
import zz from './zz.jpg'
import db, {timestamp} from './firebase'
import moment from 'moment'

const Feed = () => {

    const [posts, setPosts] = useState([]);
    
  
    useEffect(() => {
        db.collection("posts").onSnapshot((snapshot) =>
          setPosts(snapshot.docs.map((doc) => doc.data()))
        );
      }, []);



    return (
        <div className='feed'> 
        <div className='feed-header'>
            <h2>Home </h2>
        </div>
         <Tweetbox/>
        
         
         {posts.map((post) => 
          <Post
            key={post.text}
            displayname={post.displayname}
            username={post.username}
            verification={post.verification}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
            time={post.time}
            like={post.like}
            
          />
          
        )}



          
       </div>
    )
}

export default Feed
