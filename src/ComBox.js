import React, {useState, useEffect} from 'react'
import Modal from './Modal'
import db from './firebase'
import Comment from './Comment'
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

const ComBox = () => {

    const [comment, setComment]= useState([]);
    const postComment = (e) =>{
        e.preventDefault(); 
        db.collection('comments').add({
            text: comment,
            username:"22ndSeaHawk",
        });
        setComment(" ");
      
    }
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div  >
               <ChatBubbleOutlineIcon fontSize="small" onClick={() => setIsOpen(true)}/>
                 <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                 <form className='comment-input'>
                 <input 
                  
                  onChange ={e=>setComment(e.target.value)} 
                  placeholder="Tweet your reply"
                  type='text' />     
                  <button className='btn' onClick={postComment} > Reply </button>  
                  </form>                   
                </Modal>
                <div className='combox'>
  
                </div>
        </div>
        
    )
}

export default ComBox
