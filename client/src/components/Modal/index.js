import React from "react";
import ReactDOM from "react-dom";

const styles = {
    nav: {
      fontSize: "1rem",
      padding: "0.2em 0.2em",
      backgroundColor: "blue"
    },
    h1: {
      fontSize: "1.3em",
      color: "white",
      display: "flex",
      justifyContent: "center"
    },
    container: {
      position: "fixed",
      top: "50%",
      left: "50%",
      background: "white",
      border: "1px solid #ccc",
      borderRadius: 8,
      padding: 20,
      maxWidth: 600,
      transform: "translate(-50%, -50%)"
    },
    closeButton: {
      fontSize: "1rem",
      backgroundColor: "blue",
      color: "white",
      marginTop: 10,
      padding: 5,      
      float: "right"
    }
}

const Modal = ({heading, children, onClose, open }) => {
    return(
        open
        ? ReactDOM.createPortal(
            <div style={styles.container}>            
                <div style={styles.nav}><h1 style={styles.h1}>{heading}</h1></div>
                {children}
                <div style={styles.closeDiv}>
                  <button style={styles.closeButton} onClick={onClose}>Close</button>
                </div>
            </div>,
            document.querySelector("#modal")
        )
        : null
    );
}
export default Modal;