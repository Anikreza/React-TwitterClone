import React, {useState, useRef, useEffect} from 'react'
import '../../Style/messages.css'
import db, {timestamp} from '../../Database/firebase'
import {Avatar} from '@material-ui/core'
import {BrowserRouter as Router, Switch, Route, NavLink, Link} from 'react-router-dom';
import InputEmoji from "react-input-emoji";
import firebase from 'firebase'
import {MdClose} from 'react-icons/md';
import MessageList from './MessageList'
import Comp from './Card/Comp'
import MessageComp from '../../MessageComp'
import {BsCalendar} from 'react-icons/bs';
import {storage} from "../../Database/firebase";
import {BsImage} from 'react-icons/bs';
import {MdSend} from 'react-icons/md';
import {BounceLoader, BeatLoader, BarlLoader} from 'react-spinners'


const Messages = ({name, avatar, email}) => {

    const [messages, setMessages] = useState('')
    const [text, setText] = useState([])
    const [search, setSearch] = useState('')
    const [SEND, setSEND] = useState('')
    const [from, setFrom] = useState('')
    const [avt, setAvatar] = useState('')
    const [users, setUsers] = useState([])
    const [open, setOpen] = useState(false)
    const [chat, setChat] = useState(false)
    const [Focus, setFocus] = useState(false)
    const [media, setMedia] = useState(" ");
    const [mediaUrl, setMediaUrl] = useState("");
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState()


    useEffect(() => {
        getUsers()

        db.collection("to")
            .doc(name)
            .onSnapshot((snapshot) => {
                setSEND(snapshot.data()?.to);
            });

        db.collection("from")
            .doc(name)
            .onSnapshot((snapshot) => {
                setFrom(snapshot.data()?.from);
            });
    }, [users])

    useEffect(() => {
        getMsg()
    }, [])

    useEffect(() => {

        var objDiv = document.getElementById("textid");
        objDiv.scrollTop = objDiv.scrollHeight;

        var element = document.getElementById("textid");
        element.scrollTop = element.scrollHeight - element.clientHeight;

    }, [chat, text])
    useEffect(() => {


        if (!mediaUrl) return;

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

                db.collection("messages").doc(SEND).collection("chat").add({
                    time: firebase.firestore.FieldValue.serverTimestamp(),
                    image: mediaUrl,
                    sender: name,
                    reciever: SEND,
                    avatar: avatar,
                    email: email,
                });

                db.collection("messages").doc(name).collection("chat").add({
                    time: firebase.firestore.FieldValue.serverTimestamp(),
                    image: mediaUrl,
                    sender: name,
                    reciever: SEND,
                    avatar: avatar,
                    email: email,
                });
                setMediaUrl("")

            }
        );
    }, [mediaUrl])


    const storageRef = storage.ref(`images/${media.name}`);

    const send = () => {
        if (!messages) return
        setLoading(true)
        db.collection('messages').doc(SEND).collection('chat').add({
            message: messages,
            sender: name,
            reciever: SEND,
            avatar: avatar,
            email: email,
            time: firebase.firestore.FieldValue.serverTimestamp(),
        });


        db.collection('messages').doc(name).collection('chat').add({
            message: messages,
            sender: name,
            reciever: SEND,
            avatar: avatar,
            email: email,
            time: firebase.firestore.FieldValue.serverTimestamp(),

        });
        setLoading(false)
        setMessages('');
    };


    function getMsg() {

        db.collection("messages").doc(name).collection('chat').orderBy("time", "asc").onSnapshot((snapshot) =>

            setText(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        );
    }


    function getUsers() {
        db.collection("users").onSnapshot((snapshot) =>
            setUsers(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        );

    }

    const searchhandler = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
        const user = users.filter(u => {
            return u.data.username.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        })

        if (search === '') {
            getUsers()
        } else {
            setUsers(user);
        }
    }

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


    function setchat(a) {
        setOpen(!open)
        setChat(true)
        setAvatar(a)
    }

    function closemodal() {
        setOpen(!open)
        setChat(false)
    }


    return (
        <div className='messages'>
            <div className='flex-message'>
                <div className='message-box'>
                    <h4>Messages</h4>
                    <MessageList name={name} avatar={avatar}/>
                </div>

                <div className={!chat ? 'users-box' : 'hide-modal'}>
                    <h2>You don’t have a message selected</h2>
                    <p>Choose one from your existing messages, or start a new one.</p>
                    <br/>
                    <button className='message-select-button' onClick={() => setOpen(!open)}> New Message</button>

                    <div className={open ? 'message-modal' : 'hide-modal'}>
                        <MdClose onClick={closemodal} style={{cursor: 'pointer'}} size='30px'/>
                        <br/>
                        <form onSubmit={() => setSearch('')}></form>
                        <input type='text' placeholder='Search People...' value={search} onChange={searchhandler}/>
                        <hr style={{height: '1px'}}/>
                        <br/>

                        <h5 className='h5'>Select an user to start conversation</h5>
                        <div>

                            {
                                users.map(u => (
                                    <div onClick={() => setchat(u.data.avatar)}>
                                        <Comp
                                            name={name}
                                            user={u.data.username}
                                            image={u.data.avatar}
                                        />
                                    </div>


                                ))
                            }
                        </div>

                    </div>
                    <div className={open ? 'overlay' : 'hide-modal'}></div>
                </div>

                <div className={chat ? 'chatbox' : 'hide-modal'}>
                    <div className='wrap-chat' id='textid'>
                        <div className='chat-header'>
                            <div className='flex-message'>

                                <h2><Avatar src={avt}/></h2>
                                <h3 style={{display: 'flex', flexDirection: 'column'}}>{SEND} <span
                                    className='username-msgs'>{`@${SEND}_${SEND.length}`}</span></h3>
                            </div>
                            <br/>
                            <hr style={{width: '550px'}}/>
                        </div>

                        <div className='chat-middle'>
                            <div className='chat-middle-info'>
                                <h3 style={{fontWeight: '550'}}>{SEND}<span
                                    style={{fontWeight: '100', color: 'grey'}}>{` @${SEND}${SEND.length}`}</span></h3>
                                <p>This is a random bio set by the developer himself, for test purpose</p>
                                <p>Info below are fake too</p>

                                <p style={{color: 'grey'}}><span><BsCalendar/></span> Joined On {12}'th January 20{20}
                                </p>
                                <br/>
                            </div>
                        </div>
                        <hr/>
                        <div className='message-body'>

                            <div className='text'>
                                {text.map(mes => (
                                    mes.data.reciever === SEND && mes.data.sender === from || mes.data.reciever === from && mes.data.sender === SEND ?
                                        <MessageComp
                                            message={mes.data?.message}
                                            time={mes.data?.time}
                                            to={SEND}
                                            sender={mes.data?.sender}
                                            reciever={mes.data?.reciever}
                                            name={name}
                                            avatar={mes.data.avatar}
                                            image={mes.data.image}
                                            loading={loading}
                                        />
                                        :
                                        ''
                                ))}
                            </div>

                        </div>

                    </div>
                    <div className={!Focus ? 'focused' : 'pad-left'}>
                        <label htmlFor="image">
                            <BsImage style={{cursor: "pointer", marginTop: '10px', opacity: '.7'}} size='23px'
                                     color='#1DA1F2'/>
                            <input
                                type="file"
                                onChange={filehandler}
                                id="image"
                                style={{display: "none"}}
                            />
                        </label>
                        <div>

                        </div>
                        <InputEmoji

                            value={messages}
                            onChange={setMessages}
                            cleanOnEnter
                            onEnter={send}
                            placeholder="Start a new message"
                            borderRadius='20'
                            borderColor='#bfbfbf'
                            height='80'
                            onResize={() => setFocus(true)}
                        />
                        <img className='image-sending' src={mediaUrl}/>
                        <MdSend onClick={send}
                                style={{marginTop: '10px', opacity: '0.4', cursor: 'pointer', color: '	#1DA1F2'}}
                                size={25}/>
                        {
                            !mediaUrl ?
                                <div>


                                </div>
                                :
                                <div className='image-sending'>
                                    <BeatLoader/>
                                </div>

                        }

                    </div>

                </div>


            </div>
        </div>
    )
}

export default Messages
