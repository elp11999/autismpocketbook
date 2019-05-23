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
    message: "Please wait!!",
    state: false
  }

  // Component mount function
  componentDidMount() {
    API.demo()
    .then(res =>  { 
      console.log(res);
      this.setState({message: res.data.message});
    })
    .catch(err => {
        this.setState({message: "System error occurred..."});
        console.log(err);
    });  
  }
    
  render() {
    return (
      <JumboTron>
          <h1>{this.state.message}</h1>
          <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">🙄</span>
          </h1>
      </JumboTron>
    );
  }
}

// Export the Usage UI page
export default Usage;
