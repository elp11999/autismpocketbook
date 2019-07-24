//
// Signup page
//
// Signup.js
//

// Import the React library
import React from "react";

// Import the Formik library
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Import Profile component
import Profile from "../pages/AddChild";

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
class Signup extends React.Component {

    state = {
        showProfile: false,
        data: {},
        errorMessage: ""
    };

    handleOnProfileSave = (profile) => {
                                            
        // Save Child to database
        API.saveChild(apbSystem.pid, profile)
        .then(res =>  {
            console.log(res.data);
            console.log("id=" + res.data.cid);
            apbSystem.cid = res.data.cid;
            localStorage.setItem("apbSystem", JSON.stringify(apbSystem));                                
            this.props.history.push("/dashboard");
        })
        .catch(err => {
            console.log(err);
        });

    }

    render = () => {

        if (this.state.showProfile) {
            return (
                <Profile 
                    header="Add a child"
                    buttonLabel="Add Child"
                    data={this.state.data}
                    onProfileSave={this.handleOnProfileSave}
                />
            );

        } else {
            return (
                <React.Fragment>
            
                    <p style={styles.header}>Create account with Autism Pocket Book</p>         
                    <div style={styles.container}>
                        <Formik
                            initialValues={{ username: '', email: '', password: '' }}
                            validate={values => {
                                let errors = {};
                                if (!values.username)
                                    errors.username = 'Username required!!';
                                else if (!values.email) {
                                    errors.email = 'Email address required!!';
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

                                // Save parent to database
                                API.saveParent(values)
                                .then(res =>  {
                                    console.log(JSON.stringify(res.data));
                                    apbSystem.pid = res.data.pid;                                    
                                    apbSystem.user = res.data.username;                                   
                                    apbSystem.email = res.data.email;
                                    apbSystem.cid = "";
                                    localStorage.setItem("apbSystem", JSON.stringify(apbSystem));
                                    if (res.data.error)
                                        this.setState({errorMessage: res.data.error});
                                    else {
                                        this.setState({showProfile: true});
                                    }
                                })
                                .catch(err => {
                                    this.setState({errorMessage: "Unknown error has occurred"});
                                    console.log(err);
                                });
                                }, 400);
                            }}
                            >
                            {({ isSubmitting }) => (
                                <div>
                                    <Form>
                                        <div>
                                            <label style={styles.label} htmlFor="username">User name</label>
                                        </div>
                                        <Field style={styles.field} type="username" name="username" />

                                        <div>
                                            <label style={styles.label} htmlFor="email">Email address</label>
                                        </div>
                                        <Field style={styles.field} type="email" name="email" />

                                        <div>
                                            <label  style={styles.label} htmlFor="password">Password</label>
                                        </div>
                                        <Field style={styles.field} type="password" name="password" />
                                        <br />
                                        <button style={styles.button} type="submit" disabled={isSubmitting}>Create account</button>
                                        <div style={styles.errorMessageDiv}>
                                            <ErrorMessage style={styles.errorMessage} name="username" component="div" />
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
        }
    }
}

// Export the Signup UI page
export default Signup;