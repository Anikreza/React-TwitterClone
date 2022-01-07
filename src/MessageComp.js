import React, {useEffect} from 'react'
import moment from 'moment'
import {Avatar} from '@material-ui/core'
import { MdDone } from 'react-icons/md';
import { BounceLoader, BeatLoader, BarlLoader } from 'react-spinners'



const MessageComp = ({message,time,to,from,reciever,name, avatar,sender,image,loading}) => {

    return (
        <div>
            <p className={reciever===name?'span-avatar':'hide-modal'}><Avatar src={avatar}/></p>
               
               <div className={!image?'':'hide-modal'}>
                      <p className= {reciever===name?'text-right':'text-left'}>{message} </p>
                </div>
      
            
              {
                  loading?
                  <div style={{float:'left', marginLeft:'40%'}}>
                   <BeatLoader  className='loader-position' size={10} color={'grey'}/> 
                  </div>
                  :
                  <div>
                     <img className= {reciever===name?'image-right':'image-left'} src={image} />
                  </div>   

                }
             <p className={reciever===name?'tstamp-right':'tstamp-left'}>{moment(time?.toDate()).format('LT')} <span className={reciever===name?'hide-modal':''}> <MdDone color='#1DA1F2' size='18px'/></span> </p>
        </div>
    )
}

export default MessageComp
