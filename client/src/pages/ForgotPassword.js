//
// Forgot password page
//
// ForgtotPassword.js
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
        fontSize: "1.2rem",
        fontWeight: 500,
        marginRight: 5,
        marginBottom: 15

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
    },
    signup : {
      float: "right",
      color: "blue"
    }
  }
  
let apbSystem = JSON.parse(localStorage.getItem("apbSystem"));

// Function to construct Forgot Password page of the UI
class ForgotPassword extends React.Component {

    state = {
        showForgotPassword: true ,   
        data: {},
        errorMessage: ""
    };

    handleOnProfileSave = (profile) => {
                                            
        // Save Child to database
        API.saveChild(apbSystem.pid, profile)
        .then(res =>  {
            console.log(res);
            apbSystem.cid = res.data.cid;
            localStorage.setItem("apbSystem", JSON.stringify(apbSystem));
            this.props.history.push("/dashboard");
        })
        .catch(err => {
            console.log(err);
        });

    }

    handleOnProfileCancel = () => {
        this.props.history.push("/");
    }

    render = () => {

        if (this.state.showForgotPassword) {
            return (
                <React.Fragment>
                    
                    <p style={styles.header}>Reset your password</p>         
                    <div style={styles.container}>
                        <Formik
                            initialValues={{ email: '' }}
                            validate={values => {
                                this.setState({errorMessage: ""});  
                                let errors = {};
                                if (!values.email) {
                                    errors.email = 'Email  address required!!';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address!!';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    setSubmitting(false);
                                    this.setState({errorMessage: ""});                                  

                                    // Request password reset
                                    API.forgotPswd(values.email)
                                    .then(res =>  {                                    
                                        if (res.data.error)
                                            this.setState({errorMessage: res.data.error});
                                        else {
                                            console.log(res); 
                                            this.setState({showForgotPassword: false});   
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err);                                
                                        this.setState({errorMessage: "Unknown error has occurred"});
                                    });
                                }, 400);
                            }}
                            >
                            {({ isSubmitting }) => (
                                <div>
                                    <Form>
                                        <div>
                                            <label style={styles.label} htmlFor="email">Enter your email address and we will send you a link to reset your password.</label>
                                        </div>
                                        <Field style={styles.field} type="email" name="email" placeholder="Enter your email address"/>

                                        <br />
                                        <button style={styles.button} type="submit" disabled={isSubmitting}>Send password reset email</button>
                                        <div style={styles.errorMessageDiv}>
                                            <ErrorMessage style={styles.errorMessage} name="email" component="div" />
                                            <ErrorMessage style={styles.errorMessage} name="password" component="div" />
                                            <p style={styles.errorMessage}>{this.state.errorMessage}</p>
                                        </div>
                                    </Form>
                                </div>
                            )}
                        </Formik>
                    </div>
                </React.Fragment> 
            );
        } else {
            return (
                <React.Fragment>                    
                    <p style={styles.header}>Reset your password</p>         
                    <div style={styles.container}>
                        <Formik
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                setSubmitting(false);                                
                                this.props.history.push("/login");
                                }, 400);
                            }}
                            >
                            {({ isSubmitting }) => (
                                <div>
                                    <Form>
                                        <div>
                                            <label style={styles.label} htmlFor="email">Check your email for a link to reset your password. If it does't appear within a few minutes, check your spam folder.</label>
                                        </div>

                                        <button style={styles.button} type="submit" disabled={isSubmitting}>Return to sign in</button>
                                        <div style={styles.errorMessageDiv}>
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
}

// Export the Forgot Password UI page
export default ForgotPassword;