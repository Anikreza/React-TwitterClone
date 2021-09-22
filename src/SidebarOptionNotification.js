import React,{useEffect, useState} from "react";
import "./SidebarOption.css";
import db, {timestamp} from './firebase'


function SidebarOptionNotification({ active, text, Icon,name,clearnoti }) {

  const [notification, setNotification]=useState([])
  const [clrnoti, setclrNoti]=useState(clearnoti)
  var count=0;

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
    <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
      <h3> 
         <Icon size={25}/>
      </h3>

      <h2>{text}</h2>
 
         {         
            notification.map(n=>(
              <div className='hide'>
                  {n.data.enable===true?count=count+1:'' }
              </div>       
              
            ))           
          }

        <p className={count!==0?'notification-circle':'hide'}>
           {count}
        </p>
         

    </div>
  );
}

export default SidebarOptionNotification;