
import React, {useState, useEffect} from 'react'
import db from './firebase'
import {Avatar, Button} from '@material-ui/core'

const Comfeed = ({text, postusername, user}) => {

 

    return (
        <div className='combox'>
              
           <h5> {user} </h5>
          <p>{postusername}</p>
          <p>{text}</p>

        </div>
    )
}

export default Comfeed
