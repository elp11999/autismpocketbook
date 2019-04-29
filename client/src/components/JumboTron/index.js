//
// JumboTron UI component
//
// index.js
//

// Import the React library
import React from "react";

// Import CSS styles for the component
import './styles.css';

// Function to construct the JumboTron component of the UI
function JumboTron({ children }) {
  return (
    <div className="jumbotron">
    {children}
    </div>
  );
}

// Export the JumboTron UI component
export default JumboTron;