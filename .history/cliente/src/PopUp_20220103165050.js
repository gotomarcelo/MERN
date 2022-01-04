import React from "react";
import "./Popup.css"
 
function Popup() {
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={this.handleClose}>x</span>
                {this.content}
            </div>
        </div>
    );
}
 
export default Popup;