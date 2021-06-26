import React from 'react'
import './Post.css'
import av from './av.jpg'
import z from './z.jpg'
import {Avatar} from '@material-ui/core'
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import { GoVerified } from 'react-icons/go';

function Post({displayname, username, verification, time, text, image, avatar}) {

    return (
        <div className='post'>
            <div className='post-avatar'>
                <Avatar src={avatar}/>
            </div>
            <div className='post-body'>
                <div className='post-header'>
                    <div className='post-header-text'>
                        <h3> {displayname}{" "} <span className="post__headerSpecial">
                             {verification &&< GoVerified className='post__badge'/>}
                              {username} {time}</span>
                       </h3>
                    </div>
                    <div className='post-header-description'>
                         <p>{text}</p>
                    </div>
                </div>
                 <img src={image}/>
                 <div className='post-footer'>
                 <ChatBubbleOutlineIcon fontSize="small" />
                 <RepeatIcon fontSize="small" />
                 <FavoriteBorderIcon fontSize="small" />
                 <PublishIcon fontSize="small" />
                 </div>
            </div>
        </div>
    )
}

export default Post
