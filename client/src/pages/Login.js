//
// Login page
//
// Login.js
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
    },
    signup : {
      float: "right",
      color: "blue"
    }
  }

// Function to construct Login page of the UI
class Login extends React.Component {

    render = () => {
        let apbSystem = JSON.parse(localStorage.getItem("apbSystem"));
        return (
            <React.Fragment>
                
                <p style={styles.header}>Sign in to Autism Pocket Book</p>         
                <div style={styles.container}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            let errors = {};
                            if (!values.email) {
                                errors.email = 'Email  address required!!';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address!!';
                            }
                            else if (!values.password)
                                errors.password = 'Password required!!';
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                            console.log(JSON.stringify(values, null, 2));
                            setSubmitting(false);                                     

                            // Authenticate user
                            API.authenticateUser(values)
                            .then(res =>  {
                                console.log(res.data); 
                                apbSystem.parent = res.data.parent;
                                apbSystem.child = "";
                                console.log(apbSystem);
                                localStorage.setItem("apbSystem", JSON.stringify(apbSystem));

                                // Get children
                                API.getChildren(apbSystem.parent)
                                .then(res =>  {
                                    console.log(res.data);
                                    if (res.data.length > 0) {
                                        apbSystem.child = res.data[0].firstname;
                                        localStorage.setItem("apbSystem", JSON.stringify(apbSystem));
                                        this.props.history.push("/dashboard");
                                    } else {
                                        this.props.history.push("/addc");
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                            })
                            .catch(err => {
                                console.log(err);
                            });

                            }, 400);
                        }}
                        >
                        {({ isSubmitting }) => (
                            <div>
                                <Form>
                                    <div>
                                        <label style={styles.label} htmlFor="email">Email address</label>
                                    </div>
                                    <Field style={styles.field} type="email" name="email" />

                                    <div>
                                        <label  style={styles.label} htmlFor="password">Password</label>
                                        <a style={styles.signup} href="/signup">Forgot password?</a>
                                    </div>
                                    <Field style={styles.field} type="password" name="password" />
                                    <br />
                                    <button style={styles.button} type="submit" disabled={isSubmitting}>Sign in</button>
                                    <div style={styles.errorMessageDiv}>
                                        <ErrorMessage style={styles.errorMessage} name="email" component="div" />
                                        <ErrorMessage style={styles.errorMessage} name="password" component="div" />
                                    </div>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
                <div style={styles.container}>
                <span>New to Autism Pocket Book?</span>
                <a style={styles.signup} href="/signup">Create Account.</a>
                </div>
            </React.Fragment> 
        );
    }
}

// Export the Login UI page
export default Login;