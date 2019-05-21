//
// Usage page
//
// Usage.js
//

// Import the React library
import React from "react";

// Import the JumbroTron UI Component
import JumboTron from '../components/JumboTron';

// Import the API library
import API from "../utils/API";

// Function to construct the Demo page of the UI
 class Usage extends React.Component {

  state = {
    state: false
  }

  // Component mount function
  componentDidMount() {
    console.log("Demo: loading!!!");
    API.demo()
    .then(res =>  { 
      console.log(res);
    })
    .catch(err => {
        console.log(err);
    });  
  }
    
  render() {
    return (
      <JumboTron>
          <h1>The demo is loading!</h1>
          <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">🙄</span>
          </h1>
      </JumboTron>
    );
  }
}

// Export the Usage UI page
export default Usage;
