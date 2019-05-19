//
// Resources page
//
// Resources.js
//

// Import the React library
import React from "react";

import { MDBCol,  MDBIcon } from "mdbreact";

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
  }
};

//
// Autsim resources
//
const autisimResources = [
  { id: 1,
    link: "https://www.helpguide.org/articles/autism-learning-disabilities/helping-your-child-with-autism-thrive.htm/",
    image: "/HelpGuide.png",
    description: "Helping Your Child with Autism Thrive"
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

// Function to construct Reports page of the UI
function Resources() {
  return (
    
    <React.Fragment>
    
      <hr style={ styles.hr } />
      <div>

          <div className="active-pink-3 active-pink-4 mb-4" style={ styles.searchdiv }>
            <p style={ styles.search }>Need help with terminology?</p>
            <form>
              <MDBIcon icon="search" />
              <input style={ styles.searchinput }type="text" placeholder="Search" aria-label="Search" />            
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
  );
}

// Export the Usage UI page
export default Resources;

/*
import React from "react";
import { MDBCol } from "mdbreact";

const SearchPage = () => {
  return (
    <MDBCol md="6">
      <div className="active-pink-3 active-pink-4 mb-4">
        <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
      </div>
    </MDBCol>
  );
}

export default SearchPage;
*/