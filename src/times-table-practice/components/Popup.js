import React from "react";
import "./Popup.css";
import logo from "../pictures/Koala.jpg";

function Popup(props) {  
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <img className="img" alt="award logo" src={logo} />
        {props.children}        
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
