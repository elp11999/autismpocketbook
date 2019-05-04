//
// Add Child page
//
// AddChild.js
//

// Import the React library
import React from "react";

// Import the Formik library
import { Formik, Form, Field, ErrorMessage } from 'formik';

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
      maxWidth: 800
    },
    errorMessage: {
        fontSize: "1rem",
        color: 'red',
        marginTop: 5,
        marginBottom: 5
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

// Function to construct Login page of the UI
class AddChild extends React.Component {
  render = () => {

    return (
      <React.Fragment>
        
        <p style={styles.header}>Add a child</p>         
        <div style={styles.container}>
            <Formik
                initialValues={{ firstname: '', 
                                middlename: '', 
                                lastname: '', 
                                age: '', 
                                dob: "",
                                primarycareprovider: "" }}
                validate={values => {
                    let errors = {};
                    if (!values.firstname)
                        errors.firstname = 'First name required';
                    if (!values.middlename)
                        errors.middlename = 'Middle name required';
                    if (!values.lastname)
                        errors.lastname = 'Last name required';
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    this.toggleModal();
                    }, 400);
                }}
                >
                {({ isSubmitting }) => (
                    <div>
                        <Form>
                            <div>
                                <label style={styles.label} htmlFor="firstname">First name</label>
                            </div>
                            <Field style={styles.field} type="firstname" name="firstname" />
                            <ErrorMessage style={styles.errorMessage} name="firstname" component="div" />

                            <div>
                                <label style={styles.label} htmlFor="middlename">Middle name</label>
                            </div>
                            <Field style={styles.field} type="middlename" name="middlename" />
                            <ErrorMessage style={styles.errorMessage} name="middlename" component="div" />

                            <div>
                                <label  style={styles.label} htmlFor="lastname">Last name</label>
                            </div>
                            <Field style={styles.field} type="lastname" name="lastname" />
                            <ErrorMessage style={styles.errorMessage} name="lastname" component="div" />

                            <div>
                                <label  style={styles.label} htmlFor="lastname">Last name</label>
                            </div>
                            <Field style={styles.field} type="lastname" name="lastname" />
                            <ErrorMessage style={styles.errorMessage} name="lastname" component="div" />

                            <div>
                                <label  style={styles.label} htmlFor="dob">Date of birth</label>
                            </div>
                            <Field style={styles.field} type="dob" name="dob" />
                            <ErrorMessage style={styles.errorMessage} name="dob" component="div" />

                            <div>
                                <label  style={styles.label} htmlFor="age">Age of Autism Diagnosis</label>
                            </div>
                            <Field style={styles.field} type="age" name="age" />
                            <ErrorMessage style={styles.errorMessage} name="age" component="div" />

                            <div>
                                <label  style={styles.label} htmlFor="primarycareprovider">Primary care provider</label>
                            </div>
                            <Field style={styles.field} type="primarycareprovider" name="primarycareprovider" />
                            <ErrorMessage style={styles.errorMessage} name="primarycareprovider" component="div" />
                            
                            <button style={styles.button} type="submit" disabled={isSubmitting}>Add Child</button>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
      </React.Fragment> 
    );
  }
}

// Export the AddChild UI page
export default AddChild;