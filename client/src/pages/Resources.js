//
// Resources page
//
// Resources.js
//

// Import the React library
import React from "react";

// Import React-Bootstrap MD library
import { MDBIcon } from "mdbreact";

// Import the Modal UI component
import Modal from "../components/Modal";

// Import the API library
import API from "../utils/API";

// Inline CSS styles
const styles = {
  image : {
    float: 'left',
    marginLeft: 5,
    marginRight: 10
  },
  searchdiv: {
    display: "flex",
    alignItems: "center"
  },
  searchinput: {
    marginLeft: 5,
    padding: 5
  },
  search: {   
	  display: "block",
    fontSize: 20,    
    fontWeight: 400,
    marginLeft: 10,
    marginRight: 10,
    color: "#eb6864"
  },
  description: { 
    float: 'left',
    fontSize: 20,    
    fontWeight: 400,
    color: "#eb6864"
  },
  li: {
    listStyle: 'none'
  },
  hr: {
    borderWidth: 1
  },
  resource: {
    display: "flex",
    alignItems: "center"
  },
  levelheader: {
      fontWeight: 700
  }
};

//
// Autsim resources
//
const autisimResources = [
  { id: 1,
    link: "https://www.helpguide.org/articles/autism-learning-disabilities/helping-your-child-with-autism-thrive.htm/",
    image: "/HelpGuide.png",
    description: "Parenting Tips, Treatments, and Services That Can Help"
  },
  { id: 2,
    link: "http://www.autism-help.org/index.htm",
    image: "/AutismHelpOrg.jpg",    
    description: "Help with Autism, Asperger's Syndrome & Related Disorders"
  },
  { id: 3,
    link: "https://www.autismspeaks.org/",
    image: "/AutismSpeaks.png",    
    description: "Get news, updates, & more from Autism Speaks"
  },
  { id: 4,
    link: "https://cardinalautismservices.com/",
    image: "/Cardinal.jpg",    
    description: "The Leading Provider of Autism Services"
  },
];

 class Resources extends React.Component {

  state = {
    searchValue: "",
    definition: "",
    showModal: false
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.searchValue);

    // Get definition for word
    API.getDefinition(this.state.searchValue)
    .then(res =>  {
      if (res.data.definition)
        this.setState({definition: res.data.definition});
      else
        this.setState({definition: "oops... no results!!!"});
      this.setState({showModal: true});
    })
    .catch(err => {
        this.setState({definition: "oops..." + err});
        this.setState({showModal: true});
        console.log(err);
    });
  }

  onChange = (event) => {
    this.setState({searchValue: event.target.value});
  }

  toggleModal = (event) => {
    this.setState({showModal: false});
  }

  render() {
    return(
      <React.Fragment>
      
        <Modal heading={this.state.searchValue} open={this.state.showModal} onClose={this.toggleModal}>
          <br></br>
          <p><span style={styles.levelheader}>Definition: </span><span>{this.state.definition}</span></p>
        </Modal> 
    
        <hr style={ styles.hr } />
        <div>
            <div className="active-pink-3 active-pink-4 mb-4" style={ styles.searchdiv }>
              <p style={ styles.search }>Need help with terminology?</p>
              <form onSubmit={this.onSubmit}>
                <MDBIcon icon="search" />
                <input type="text" onChange={this.onChange} style={ styles.searchinput } placeholder="Search" aria-label="Search" />            
              </form>
            </div>
        </div>
        <ul style={styles.ul}>
          {autisimResources.map(resource => (      
            <li key={resource.id} style={ styles.li }>
                <hr style={ styles.hr } />
                <div className="cfix" style={ styles.resource }>
                  <a href={resource.link} rel="noopener noreferrer" target="_blank">
                    <img style={ styles.image } src={resource.image} alt="thumbnail" width="100" height="60"></img>
                  </a>              
                  <a href={resource.link} rel="noopener noreferrer" target="_blank">
                    <p><span style={ styles.description }>{resource.description}</span></p>
                  </a>
                </div>
              </li>
          ))}
        </ul>
        <hr style={ styles.hr } />        
      </React.Fragment>
    )
  }
}

// Export the Usage UI page
export default Resources;