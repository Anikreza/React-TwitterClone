import React, {useState, useEffect} from 'react'
import Modal from './Modal'
import db from './firebase'
import Comfeed from './Comfeed'
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import firebase from 'firebase';

const ComBox = ({name, postusername, avatar}) => {

    const [comment, setComment]= useState([]);



    const postComment = (e) =>{
        e.preventDefault(); 
        db.collection('comments').add({
            text: comment,
            username: name,
           
        
            poster: postusername,
        });
        alert(`Replied to ${postusername}`) 
        setComment(" ");
        setComments(" ");
        console.log(comment)
    }

    

    const [comments, setComments]= useState([]);
    
    useEffect(() => {
        db.collection("comments").orderBy("time", "asc").onSnapshot((snapshot) =>
          setComments(snapshot.docs.map((doc) => doc.data()))
        );
           console.log(comments)
      }, []);

   




    const [isOpen, setIsOpen] = useState(false)

    return (
        <div  >
               <ChatBubbleOutlineIcon fontSize="small" onClick={() => setIsOpen(true)}/>
                 <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                 <form className='comment-input'>
                 <input            
                  onChange ={e=>setComment(e.target.value)} 
                  placeholder="Tweet your reply"
                  value={comment}
                  type='text' />   
                  <button className='btn' onClick={postComment} > Reply </button>  
                  </form>                   
                </Modal>

               


                {comments.forEach((com) => 
         
         <Comfeed
         key={com.text}
         text={com.text}
         username={com.username}
         postusername={com.poster}
       
       />
       
        
          
        )}




       
        </div>

       
        
    )
}

export default ComBox
