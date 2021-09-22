
import React, {useState, useEffect} from 'react'
import db from './firebase'
import {Avatar, Button} from '@material-ui/core'

const Comfeed = ({text, postusername, user}) => {

 

    return (
        <div className='combox'>
              
           <p> {user} </p>
          <p>Replying to {postusername}</p>
          <p>{text}</p>

        </div>
    )
}

export default Comfeed
