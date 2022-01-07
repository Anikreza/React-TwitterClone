import React from "react";
import "../../../Style/SidebarOption.css";

function SidebarOption({ active, text, Icon }) {
  return (
    <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
      <h3> 
         <Icon size={25}/>
      </h3>

      <h2>{text}</h2>
    </div>
  );
}

export default SidebarOption;