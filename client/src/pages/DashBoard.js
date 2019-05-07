//
// DashBoard page
//
// DashBoard.js
//

// Import the React library
import React from "react";

// Import Calendar component

import Calendar from "../components/Calendar";

// Function to construct Login page of the UI
class DashBoard extends React.Component {
    
  render = () => {

    return (
      <React.Fragment>
        <Calendar />
      </React.Fragment> 
    );
  }
}

// Export the DashBoard UI page
export default DashBoard;
