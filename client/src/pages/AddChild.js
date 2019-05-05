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
      fontWeight: 500
      
    },
    subheader: {
      fontSize: "1.5rem",
      color: "#eb6864",
      textAlign: "center",
      marginTop: 20,
      marginBottom: 10,
      fontWeight: 500
      
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
    mfield: {
        background: "#e8f0fe",
        boxShadow: "inset 0 1px 2px rgba(27,31,35,.075)",
        fontSize: "1.1rem",
        marginBottom: 10,
        marginRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
        width: "32%"
    },
    label: {
        fontSize: "1.1rem",
        fontWeight: 500,
        marginTop: 10,
        marginRight: 5,
        marginBottom: 5

    },
    mlabel: {
        fontSize: "1.1rem",
        fontWeight: 500,
        marginRight: 10,
        marginBottom: 5,
        width: "32%"

    },
    rlabel: {
        marginLeft: 5
    },
    radio: {
        ontSize: "1.1rem",
        marginRight: 5
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
                            <p style={styles.subheader}>Basic information</p> 
                            <div>
                                <label style={styles.label} htmlFor="firstname">First name</label>
                            </div>
                            <Field style={styles.field} type="text" name="firstname" />
                            <ErrorMessage style={styles.errorMessage} name="firstname" component="div" />

                            <div>
                                <label style={styles.label} htmlFor="middlename">Middle name</label>
                            </div>
                            <Field style={styles.field} type="text" name="middlename" />
                            <ErrorMessage style={styles.errorMessage} name="middlename" component="div" />

                            <div>
                                <label  style={styles.label} htmlFor="lastname">Last name</label>
                            </div>
                            <Field style={styles.field} type="text" name="lastname" />
                            <ErrorMessage style={styles.errorMessage} name="lastname" component="div" />

                            <div>
                                <label  style={styles.label} htmlFor="dob">Date of birth</label>
                            </div>
                            <Field style={styles.field} type="text" name="dob" />
                            <ErrorMessage style={styles.errorMessage} name="dob" component="div" />

                            <hr />

                            <p style={styles.subheader}>Medical overview</p> 

                            <div>
                                <label  style={styles.label} htmlFor="age">Age of autism diagnosis</label>
                            </div>
                            <Field style={styles.field} type="text" name="age" />
                            <ErrorMessage style={styles.errorMessage} name="age" component="div" />

                            <div>
                                <label style={styles.label} htmlFor="primarycareprovider">Primary care provider</label>
                            </div>
                            <Field style={styles.field} type="text" name="primarycareprovider" />
                            <ErrorMessage style={styles.errorMessage} name="primarycareprovider" component="div" />
                            
                            <div>
                                <label style={styles.label} htmlFor="interventions">Current interventions</label>
                            </div>
                            <select style={styles.label} id="interventions" name="interventions">
                                <option>Applied Behavior Analysis</option>
                                <option>Speech Therapy</option>
                                <option>Occupational Therapy</option>
                                <option>Music Therapy</option>
                                <option>Physical Therapy</option>
                                <option>Feeding Therapy</option>
                                <option>Social Skills Therapy</option>
                                <option>Biomedical treatment</option>
                                <option>Social Skills Therapy</option>
                                <option>Nutritional Interventions</option>
                                <option>Other</option>
                            </select>
                            
                            <hr />

                            <p style={styles.subheader}>Current medications</p> 
                            
                            <div>
                                <label  style={styles.mlabel} htmlFor="name">Name</label>
                                <label  style={styles.mlabel} htmlFor="frequency">Frequency</label>
                                <label  style={styles.mlabel} htmlFor="dosage">Dosage</label>
                            </div>
                            <div>                            
                                <Field style={styles.mfield} type="text" name="med1" />                            
                                <Field style={styles.mfield} type="text" name="freq1" />                            
                                <Field style={styles.mfield} type="text" name="dos1" />
                            </div>
                            <div>                            
                                <Field style={styles.mfield} type="text" name="med2" />                            
                                <Field style={styles.mfield} type="text" name="freq2" />                            
                                <Field style={styles.mfield} type="text" name="dos2" />
                            </div>
                            <div>                            
                                <Field style={styles.mfield} type="text" name="med3" />                            
                                <Field style={styles.mfield} type="text" name="freq3" />                            
                                <Field style={styles.mfield} type="text" name="dos3" />
                            </div>
                            <div>                            
                                <Field style={styles.mfield} type="text" name="med4" />                            
                                <Field style={styles.mfield} type="text" name="freq4" />                            
                                <Field style={styles.mfield} type="text" name="dos4" />
                            </div>
                            <div>                            
                                <Field style={styles.mfield} type="text" name="med5" />                            
                                <Field style={styles.mfield} type="text" name="freq5" />                            
                                <Field style={styles.mfield} type="text" name="dos5" />
                            </div>
                            <div>                            
                                <Field style={styles.mfield} type="text" name="med6" />                            
                                <Field style={styles.mfield} type="text" name="freq6" />                            
                                <Field style={styles.mfield} type="text" name="dos6" />
                            </div>
                            <div>                            
                                <Field style={styles.mfield} type="text" name="med7" />                            
                                <Field style={styles.mfield} type="text" name="freq7" />                            
                                <Field style={styles.mfield} type="text" name="dos7" />
                            </div>
                            <div>                            
                                <Field style={styles.mfield} type="text" name="med8" />                            
                                <Field style={styles.mfield} type="text" name="freq8" />                            
                                <Field style={styles.mfield} type="text" name="dos8" />
                            </div>
                            <div>                            
                                <Field style={styles.mfield} type="text" name="med9" />                            
                                <Field style={styles.mfield} type="text" name="freq9" />                            
                                <Field style={styles.mfield} type="text" name="dos9" />
                            </div>
                            <div>                            
                                <Field style={styles.mfield} type="text" name="med10" />                            
                                <Field style={styles.mfield} type="text" name="freq10" />                            
                                <Field style={styles.mfield} type="text" name="dos10" />
                            </div>

                            <hr />

                            <p style={styles.subheader}>Behaviorial overview</p>                            

                            <div>
                                <label style={styles.label} htmlFor="autsimlevel">Level of Autism Diagnosis</label>
                            </div>
                            
                            <div>
                                <label style={styles.rlabel}>
                                    <input style={styles.radio}
                                        name="autsimlevel"
                                        id="autsimlevel1"
                                        type="radio"
                                        value=""
                                    />
                                    Level 1
                                </label>
                            </div>
                            
                            <div>
                                <label style={styles.rlabel}>
                                    <input style={styles.radio}
                                        name="autsimlevel"
                                        id="autsimlevel2"
                                        type="radio"
                                        value=""
                                    />
                                    Level 2
                                </label>
                            </div>
                            
                            <div>
                                <label style={styles.rlabel}>
                                    <input style={styles.radio}
                                        name="autsimlevel"
                                        id="autsimlevel3"
                                        type="radio"
                                        value=""
                                    />
                                    Level 3
                                </label>
                            </div>
                             
                            <div>
                                <label style={styles.label} htmlFor="cofactors">Co-Factors</label>
                            </div>
                            <select style={styles.label} id="cofactors" name="cofactors">
                                <option>ADD</option>
                                <option>ADHD</option>
                                <option>Anxiety Depression</option>
                                <option>OCD</option>
                                <option>Gifted</option>
                                <option>Tourette’s Auditory Processing</option>
                                <option>Expressive Language Delay</option>
                                <option>Learning Difficulties</option>
                                <option>Seizures</option>
                                <option>Food Allergies</option>
                                <option>Other</option>
                            </select>

                            <hr />

                            <p style={styles.subheader}>School overview</p>
                            <div>
                                <label style={styles.label} htmlFor="schoolaccomodations">School accomodations</label>
                            </div>
                            <select style={styles.label} id="schoolaccomodations" name="schoolaccomodations">
                                <option>Visual schedule</option>
                                <option>Adaptive Devices</option>
                                <option>Extra time</option>
                                <option>Frequent feedback</option>
                                <option>Opportunity for pull out time</option>
                                <option>Sensory Breaks</option>
                                <option>Aide Provided</option>
                                <option>Other</option>
                            </select> 

                            <hr />
                            
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