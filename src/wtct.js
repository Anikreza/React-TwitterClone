import React, { useState, useEffect } from "react";
import "./Chat.css";
import a from "./aa.jpg";
import b from "./as.jpg";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import moment from "moment";
import { storage, ts } from "./firebase";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { useRef } from "react";
import InputEmoji from "react-input-emoji";

const Chat = () => {

  const inputRef= useRef();  
  const [{ user }, dispatch] = useStateValue();
  const [UserInfo, setUserInfo]= useState('') ;
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [media, setMedia] = useState(" ");
  const [mediaUrl, setMediaUrl] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [input, setInput] = useState("");

  // snapshots Room and messages

  useEffect(() => {

    db.collection("rooms")
      .doc(roomId)
      .onSnapshot((snapshot) => {
        setRoomName(snapshot.data().name);
      });

    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, [roomId]);


  function usercall(){
        db.collection('users').doc(user.uid).onSnapshot((snapshot)=>{
          setUserInfo(snapshot.data().user)
        }) 
       
  }

  // sends image to storage

  useEffect(() => {
  

   
    if(!mediaUrl) return;
      
    storageRef.put(media).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
  
        db.collection("rooms").doc(roomId).collection("messages").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          image: mediaUrl,
          name: user?.displayName,
        });
        setMediaUrl("")
      }
      
    );
   }, [mediaUrl])
  
    const storageRef = storage.ref(`images/${media.name}`);
  
   
    //Handle Media File and Texts

  const filehandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      let reader = new FileReader();

      await setMedia(file);
      reader.onloadend = () => {
        setMediaUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setMedia(null);
      setError("Please select an image file");
    }
  };
   

  
// Send it to Database

  const send = () => {
    if(!input) return;

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user?.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      
    });
    setInput("");
    
  };
  
  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar src={user.photoURL} />
        <div className="chat-header-info">
          <h3>{roomName}</h3>

          <p>
            Last Active .{" "}
            {moment(messages[messages.length - 1]?.timestamp?.toDate())
              .startOf("minute")
              .fromNow()}
          </p>
        </div>
        <div className="chat-header-right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <label htmlFor="image">
              <AttachFile style={{ cursor: "pointer" }} />
              <input
                type="file"
                onChange={filehandler}
                id="image"
                style={{ display: "none" }}
              />
            </label>
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

            
             <div className={`chat-body ${
              user.email !=='tanvirrezaanik@gmail.com'  && "hidden-photo" && 
              user.email !=='jainfariha@gmail.com'  && "hidden-photo"  &&
              user.email !=='anikreza22@gmail.com'  && "hidden-photo"
            }`}>
             
           {messages.map((message) => (
          <p
            className={`message ${
              message.name === user.displayName && "reciever"          
            }`}
          >
            
            {message.message} <img className="media" src={message.image} />
            <span className="sender-name"> {message.name} </span>
            <span className="timestamp">
              {moment(message.timestamp?.toDate()).format('LT')}
            </span>
          </p>
        ))}
      </div>



      <div className='chat-footer' >
      <MicIcon />      
       
      <InputEmoji
      value={input}
      onChange={setInput}
      cleanOnEnter
      onEnter={send}
      placeholder="Type a message"
      borderRadius='20'
      />

      </div>
    </div>
  );
};

export default Chat;
