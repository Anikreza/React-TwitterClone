import React, {useEffect} from 'react'
import moment from 'moment'
import {Avatar} from '@material-ui/core'


const MessageComp = ({message,time,to,from,reciever,name, avatar,sender}) => {

    useEffect(() => {
        console.log(reciever)
    }, [])

    return (
        <div>
            {
                
                <div >
                <p className={reciever===name?'text-right':'text-left'}>{message}</p>
                   
                    <p className={reciever===name?'tstamp-right':'tstamp-left'}>{moment(time?.toDate()).format('LT')}</p>
                </div> 
               
            }
      
         
        </div>
    )
}

export default MessageComp
