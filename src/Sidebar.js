import React,  {useEffect, useState} from "react";
import "./Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import SubjectIcon from '@material-ui/icons/Subject';
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { Button } from "@material-ui/core";
import { FiHash } from 'react-icons/fi';
import { CgMoreO } from 'react-icons/cg';
import { GrNotification }  from 'react-icons/gr';
import { RiHome7Fill } from 'react-icons/ri';
import { BsBookmark } from 'react-icons/bs';
import {   BsThreeDots } from 'react-icons/bs';
import {Avatar} from '@material-ui/core'
import { GoogleLogout } from 'react-google-login';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import SidebarOptionNotification from "./SidebarOptionNotification";
import { BrowserRouter as Router,Switch, Route, NavLink,Link} from 'react-router-dom';
import db, {timestamp} from './firebase'



function Sidebar({name, avatar}) {


  const [notification, setNotification]=useState([])
  const [clearnoti, setClearNoti]=useState(false)


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



  function clearNotification(){
      setClearNoti(true)
      for (let i=0; i<=notification.length; i++){
        db.collection('notifications').doc(name).collection('notification').doc(notification[i]?.id).update({
          enable: false 
      });
      console.log(i)
      }

  }


  const [modal, setModal] = useState(false);
  return (
    <div className="sidebar">

      <NavLink path to='/React-TwitterClone'>
      <TwitterIcon className="sidebar__twitterIcon" />
      </NavLink>

      <NavLink path to='/React-TwitterClone' activeStyle={{fontWeight:'1000'}}>
      <SidebarOption Icon={RiHome7Fill}  text="Home" />
      </NavLink>

      <div onClick={()=> window.alert('Under Developement')}>
          <SidebarOption Icon={FiHash} text="  Explore" />
      </div>
     
      <div onClick={clearNotification}>
      <NavLink path to='/notification' activeStyle={{fontWeight:'1000'}}>
      <SidebarOptionNotification clearnoti={clearnoti} name={name} Icon={GrNotification} text="Notifications" />
      </NavLink>
      </div>

      <div >
      <NavLink path to='/messages' activeStyle={{fontWeight:'1000'}}>
      <SidebarOption  Icon={MailOutlineIcon} text="Messages" />
      </NavLink>
      </div>
     
      <div onClick={()=> window.alert('Under Developement')}>
      <SidebarOption Icon={BsBookmark} text="Bookmarks" />
      </div>

      <div onClick={()=> window.alert('Under Developement')}>
          <SidebarOption Icon={SubjectIcon } text="Lists" />
      </div>
      
      <div onClick={()=> window.alert('Under Developement')}>
          <SidebarOption Icon={PermIdentityIcon} text="Profile" />
      </div>
      
      <div onClick={()=> window.alert('Under Developement')}>
          <SidebarOption Icon={CgMoreO} text="  More" />  
      </div>
      
      

      {/* Button -> Tweet */}
      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>

      <div onClick={() => setModal(true)} className='sidebar-bottom'>
      <Avatar src={avatar}/> 

        <h4>{name}<br/> <p1 className='sm'>@{name}</p1> </h4>
        
        <BsThreeDots size='20px'/> 
      </div>

      <PureModal 
              className='logout-bottom'
              isOpen={modal} 
              portal={true}
              onClose={() => {
                setModal(false);
                return true;
               }}>
                 <div style={{display:'flex'}}>
                 <Avatar src={avatar}/>
                 <h4 style={{paddingLeft:'8px'}}>{name}<br/> <p1 className='sm'>@{name}</p1> </h4>
                 </div>
                 <h4 style={{paddingLeft:'5px', paddingTop:'10px', fontWeight:'lighter'}}>Add an existing account</h4>
                 <a href="" onclick="dummy(0);return false;" > 
              <GoogleLogout
                  render={renderProps => (
                    <button className='logout' onClick={renderProps.onClick} disabled={renderProps.disabled}>Log Out @{name}</button>
                  )}
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  buttonText="Logout"
                  onLogoutSuccess
              />  
       </a>
                
        </PureModal>




    
    </div>
  );
}

export default Sidebar;