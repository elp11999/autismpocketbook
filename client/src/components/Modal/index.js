// Import React
import React from "react";

// Import React-Dom
import ReactDOM from "react-dom";

// Import custom CSS
import "./index.css";

const Modal = ({heading, children, onClose, open }) => {
    return(
        open
        ? ReactDOM.createPortal(
            <div className="modal-container">            
                <div className="modal-header-div"><h1 className="modal-header-text">{heading}</h1></div>
                {children}
                <button className="modal-close-button" onClick={onClose}>Close</button>
            </div>,
            document.querySelector("#modal")
        )
        : null
    );
}
export default Modal;