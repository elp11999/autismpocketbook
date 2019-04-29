//
// NoMatch 404 page
//
// NoMatch.js
//

// Import the React library
import React from "react";

// Import the JumbroTron UI Component
import JumboTron from '../components/JumboTron';

// Function to construct the 404 NoMatch page of the UI
function NoMatch() {
  return (
    <JumboTron>
        <br></br>
        <h1>404 Page Not Found!</h1>
        <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">🙄</span>
        </h1>
    </JumboTron>
  );
}

// Export the NoMatch 404 UI page
export default NoMatch;
