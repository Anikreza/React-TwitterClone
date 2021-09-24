import React, {useEffect} from 'react'
import moment from 'moment'

const MessageComp = ({message,time}) => {

    return (
        <div  className='rightm'>
       <div className='text-leftrr'>                              
        <p className='color-recieve'>{message}</p>
         <p className='rightt'>{moment(time?.toDate()).format('LT')}</p>
      </div>
        </div>
    )
}

export default MessageComp
