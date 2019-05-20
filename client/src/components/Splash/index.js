//
// Splash UI Component
//
// index.js
//

// Import the React library
import React from "react";

// Import the CSS for the Home component
import './styles.css';

// Function to construct the NavBar component of the UI
function Splash(props) {
    //console.log(props);
    return (
        <div className="home-header">
            <img className="home-header-image" src="/Sam.jpeg" alt="pic"></img>
            <h1 className="home-header-text">
                Using the Autism Pocketbook will make it possible to gain insight into what triggers behaviors and can assist families into developing strategies for their children.
            </h1>
        </div>
    );
}

// Export the Splash UI component
export default Splash;