import React, {useState, useEffect} from 'react'
import './Feed.css'
import Tweetbox from './Tweetbox'
import Post from './Post'
import Comfeed from './Comfeed'
import ComBox from './ComBox'
import a from './a.jpg'
import aa from './aa.jpg'
import z from './z.jpg'
import zz from './zz.jpg'
import db, {timestamp} from './firebase'

const Feed = ({name, avatar}) => {

    const [posts, setPosts] = useState([]);
    
  
    useEffect(() => {
        db.collection("posts").orderBy("time", "desc").onSnapshot((snapshot) =>
          setPosts(snapshot.docs.map((doc) =>(
            {
              id: doc.id,
              data: doc.data(),               
            }
          )))
        ); 
      }, []);


     
   
        

    return (
        <div className='feed'> 
        <div className='feed-header'>
            <h2>Home </h2>
        </div>

        
         <Tweetbox avatar={avatar}  name={name}/>
         
             
         {posts.map((post) => 
          <Post
            key={post.data.text}
            displayname={post.data.displayname}
            username={post.data.username}
            verification={post.data.verification}
            text={post.data.text}
            avatar={post.data.avatar}
            image={post.data.image}
            time={post.data.time}
            like={post.data.like}
            name={name}
            avatarr={avatar}
            postid={post.id}
          />
          
        )}

                         
<Comfeed  />

          
       </div>
    )
}

export default Feed
