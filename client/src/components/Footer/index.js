//
// Footer UI Component
//
// index.js
//

// Import the React library
import React from "react";

// Import the CSS for the Home component
import './styles.css';

// Function to construct the Footer component of the UI
function Footer(props) {
    return (
        <footer className="page-footer font-small special-color-dark pt-4">  
            <div className="container"> 
              <div className="row"> 
                <div className="col-md-12 py-3">
                  <div className="text-center">
                    <a className="fb-ic" href="/">
                      <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                    </a>
                    <a className="tw-ic" href="/">
                      <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                    </a>
                    <a className="gplus-ic" href="/">
                      <i className="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                    </a>
                    <a className="li-ic" href="/">
                      <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                    </a>
                    <a className="ins-ic" href="/">
                      <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                    </a>
                    <a className="pin-ic" href="/">
                      <i className="fab fa-pinterest fa-lg white-text fa-2x"> </i>
                    </a>
                  </div>
                </div>        
              </div>        
            </div> 
            <div className="footer-copyright text-center py-3"><span className="footer-text">© 2019 Copyright:</span>
              <a className="footer-text" href="/"> AutismPocketBook.com</a>
            </div>        
          </footer>
    );
}

export default Footer;