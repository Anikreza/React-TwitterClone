import React, {useState, useEffect} from 'react'

const Chatbox = ({SendToName,sendToAvatar,sendToMail,name,avatar,mail}) => {
    return (
        <div className='chatbox'>
            <p>{name}</p>
            <p>{mail}</p>
        </div>
    )
}

export default Chatbox
