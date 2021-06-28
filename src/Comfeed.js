
import React, {useState, useEffect} from 'react'
import db from './firebase'
import Comment from './Comment'
import ComBox from './ComBox'

const Comfeed = () => {

    const [comments, setComments]= useState([]);
    
    useEffect(() => {
        db.collection("comments").onSnapshot((snapshot) =>
          setComments(snapshot.docs.map((doc) => doc.data()))
        );
      }, []);


    return (
        <div className='combox'>

          <ComBox />  
                     
          {comments.map((comment) => (
          <Comment
            key={comment.text}
            text={comment.text} 
            username={comment.username} 
          />
        ))}

         

        </div>
    )
}

export default Comfeed
