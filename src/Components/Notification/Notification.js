import React,{useEffect, useState} from "react";
import '../../Style/Notification.css'
import db, {timestamp} from '../../Database/firebase'
import TwitterIcon from "@material-ui/icons/Twitter";
import { BounceLoader, BeatLoader, BarlLoader } from 'react-spinners'
import moment from 'moment'

const Notification = ({name}) => {

 
    const [notification, setNotification]=useState([])
    const [color, setColor]=useState(true)
    const [color2, setColor2]=useState(false)

   
    function toggoleColor(){
      setColor2(!color2)
      setColor(!color)
    }
    useEffect(() => {
        
        db.collection('notifications').doc(name).collection('notification').orderBy("time", "desc").onSnapshot((snapshot) =>
          setNotification(snapshot.docs.map((doc) =>(
            {
              id:doc.id,
              data: doc.data(),               
            }
          )))
        ); 
      }, [notification]);


    return (
        <div className='notification'>
           <div className='flexbox'>
                <h3 onClick={toggoleColor} className='lefth'>All</h3>
                <h3 onClick={toggoleColor} className='righth'>Mentions</h3>
           </div>
           <hr className={color?'move-hr-bg':'move-hr'}/> 

           <hr className={color2?'move-hr-r-bg':'move-hr-r'}/> 
           <hr/>

                  {
                    notification.length!==0?
                    notification.map(n=>(
                      <div className='flex'>
                          <h2><TwitterIcon size={45}/></h2>
                          <p>{`${n.data.notification}    `}<p1 className='color-notif'>{moment(n.data.time?.toDate()).startOf("minute").fromNow()}</p1>    <hr/></p> 
                                    
                      </div>
                                
                  ))   :
                      <div>
                          <p>You currently have no notifications Loaded</p>
                          <p>When another user comments or retweets to your tweets, A notification warning will appear on the sidebar #Notification</p>
                          <p> And the notification will be displayed here</p>
                      </div>

                  }
              
                  {
                      notification.length!==0?
                        <div >

                        </div>
                            :
                        <div className='loader'>     
                            
                        </div>
                  }
        </div>
    )
}

export default Notification
