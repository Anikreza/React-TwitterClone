import React from "react";
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
import a from './aa.jpg'
import {Avatar} from '@material-ui/core'

function Sidebar() {
  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />

      <SidebarOption active Icon={RiHome7Fill} text="Home" />
      <SidebarOption Icon={FiHash} text="  Explore" />
      <SidebarOption Icon={GrNotification} text="Notifications" />
      <SidebarOption Icon={MailOutlineIcon} text="Messages" />
      <SidebarOption Icon={BsBookmark} text="Bookmarks" />
      <SidebarOption Icon={SubjectIcon } text="Lists" />
      <SidebarOption Icon={PermIdentityIcon} text="Profile" />
      <SidebarOption Icon={CgMoreO} text="  More" />    

      {/* Button -> Tweet */}
      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>

      <div className='sidebar-bottom'>
      <Avatar src={a}/> 

        <h4>Tanvir Reza Anik<br/> <p1 className='sm'>@TanvirRezaAnik1</p1> </h4>
        
        
        <BsThreeDots size='20px'/>
      </div>
 
    </div>
  );
}

export default Sidebar;