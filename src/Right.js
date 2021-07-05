import React from 'react'
import './Right.css'
import {
    TwitterTimelineEmbed,
    TwitterShareButton,
    TwitterTweetEmbed,
  } from "react-twitter-embed";
  import { FiSearch } from 'react-icons/fi';

const Right = () => {
    return (
        <div className='right'>
           <div className='right-input'>
               <FiSearch size= '20px'  className='right-search-icon'/>   
                <input type='text' placeholder='Search Twitter'/>
           </div>
           <div className='right-container'>
                
                <h2>Trends for you</h2>
               
                
                <TwitterTimelineEmbed sourceType='profile' screenName='KAKA' options={{height:300}} />
                <TwitterTimelineEmbed sourceType='profile' screenName='liverpoolfc' options={{height:300}} />
                <TwitterTweetEmbed tweetId={"1399698641535832068"}/>
                </div>
        </div>
    )
}

export default Right

