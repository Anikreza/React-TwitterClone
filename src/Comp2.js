import React from 'react'
import {Avatar} from '@material-ui/core'


const Comp2 = (user,message,avatar) => {
    return (
        <div>
                          <h2>{user}</h2>
                          <p>{message}</p>
                          <Avatar src={avatar}/>
        </div>
    )
}

export default Comp2
