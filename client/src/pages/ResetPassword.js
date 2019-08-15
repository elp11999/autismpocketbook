//
// Reset Password page
//
// ResetPassword.js
//

// Import the React library
import React from "react";

// Import the Formik library
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Import the API library
import API from "../utils/API";

const styles = {
    header: {
      fontSize: "2rem",
      color: "#eb6864",
      textAlign: "center",
      marginTop: 20,
      fontWeight: 500,
      
    },
    container: {
      marginTop: 20,
      marginBottom: 20,
      marginLeft: "auto",
      marginRight: "auto",
      background: "white",
      border: "1px solid #ccc",
      borderRadius: 5,
      padding: 20,
      maxWidth: 400
    },
    errorMessageDiv: {
        textAlign: "center",
        marginTop: 10
    },
    errorMessage: {
        fontSize: "1.5rem",
        color: 'red'
    },
    field: {
        background: "#e8f0fe",
        boxShadow: "inset 0 1px 2px rgba(27,31,35,.075)",
        fontSize: "1.1rem",
        marginBottom: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
        width: "100%"
    },
    label: {
        fontSize: "1.1rem",
        fontWeight: 500,
        marginRight: 5,
        marginBottom: 5

    },
    button: {
        fontSize: "1.1rem",
        backgroundColor: "#2ebb4e",
        backgroundImage: "linear-gradient(-180deg,#34d058,#28a745 90%)",
        color: "white",
        marginTop: 5,
        padding: 10,
        borderRadius: 5,
        width: "100%"
    }
  }
  
let apbSystem = JSON.parse(localStorage.getItem("apbSystem"));

// Function to construct Login page of the UI
class ResetPassword extends React.Component {

    state = {
        errorMessage: ""
    };

    componentDidMount () {
        // Get token from URL
    }

    render = () => {
 
        return (
            <React.Fragment>
        
                <p style={styles.header}>Change password</p>         
                <div style={styles.container}>
                    <Formik
                        initialValues={{ password: '', confirmpassword: '' }}
                        validate={values => {
                            this.setState({errorMessage: ""});
                            let errors = {};
                            if (!values.password)
                                errors.password = 'Password required!!';
                            else if (!values.confirmpassword)
                                errors.confirmpassword = 'Confirm password!!';
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                            console.log(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                            if (values.password != values.confirmpassword)                            
                                this.setState({errorMessage: "Passwords do not match!!"});
                            else { 
                                console.log("token=" + this.props.match.params.token); 
                                // Reset password
                                const resetData = {
                                    token: this.props.match.params.token,
                                    password: values.password
                                } 
                                API.resetPswd(resetData)
                                .then(res =>  {                                    
                                    if (res.data.error)
                                        this.setState({errorMessage: res.data.error});
                                    else {
                                        console.log(res); 
                                        this.props.history.push("/login"); 
                                    }
                                })
                                .catch(err => {
                                    console.log(err);                                
                                    this.setState({errorMessage: "Unknown error has occurred"});
                                });
                            } 
                            }, 400);
                        }}
                        >
                        {({ isSubmitting }) => (
                            <div>
                                <Form>
                                    <div>
                                        <label style={styles.label} htmlFor="password">Password</label>
                                    </div>
                                    <Field style={styles.field} type="password" name="password" />

                                    <div>
                                        <label  style={styles.label} htmlFor="confirmpassword">Confirm password</label>
                                    </div>
                                    <Field style={styles.field} type="password" name="confirmpassword" />
                                    <br />
                                    <button style={styles.button} type="submit" disabled={isSubmitting}>Change password</button>
                                    <div style={styles.errorMessageDiv}>
                                        <ErrorMessage style={styles.errorMessage} name="password" component="div" />
                                        <ErrorMessage style={styles.errorMessage} name="confirmpassword" component="div" />
                                        <p style={styles.errorMessage}>{this.state.errorMessage}</p>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </React.Fragment> 
        );
    }
}

// Export the Reset password UI page
export default ResetPassword;