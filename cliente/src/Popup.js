import React, { useState } from "react";
import "./Popup.css";

const Popup = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <input className="button2" value="..." type="button" onClick={togglePopup} />
      {isOpen && 
      <div className="popup-box">
        <div className="box">
          {props.children}
        </div>
      </div>}
    </>
  );
};

export default Popup;
