//
// Add Child page
//
// AddChild.js
//

// Import the React library
import React from "react";

// Import the Formik library
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Modal from "../components/Modal";

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
      maxWidth: 700
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
    },
    label: {
        fontSize: "1.1rem",
        fontWeight: 500,
        marginTop: 10,
        marginRight: 5,
        marginBottom: 5

    },
    cofactorlabel: {
        marginTop: 25
    },
    mlabel: {
        fontSize: "1.1rem",
        fontWeight: 500,
        marginRight: 10,
        marginBottom: 5,
        width: "32%"

    },
    mNameLabel: {
        width: "70%"
    },
    mFreqLabel: {
        width: "10%"
    },
    mDosLabel: {
        width: "12%"
    },
    mNameField: {
        width: "70%"
    },
    mFreqField: {
        width: "10%"
    },
    mDosField: {
        width: "12%"
    },
    rlabel: {
        fontSize: "1.0rem",
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
    },
    levelheader: {
        fontWeight: 700
    }
  }

const levels = [
    {
        heading: "Level 1: Requiring Support",
        social: "An individual with this diagnosis will have deficits in social communication that cause them noticeable impairments.  They show difficulties with starting social interactions and have difficulties with properly interacting with peers.   They will likely be verbal, but could have difficulties with using language in a proper manner.",
        behavior: "An individual with this diagnosis will have repetitive type behaviors and routines/rituals that interfere with day-to-day life. This can include things such as difficulty with transitions and inflexible behaviors."
    },
    {
        heading: "Level 2: Requiring Substantial Support",
        social: "Social: An individual with this diagnosis will have deficits in social communication, that will include both verbal and nonverbal.  These impairments are noticeable even with extra supports in place for the individual.  The individual will have difficulties with starting social interactions and have difficulties with properly interacting with peers.",
        behavior: "An individual with this diagnosis will have repetitive type behaviors and routines/rituals that interfere with day-to-day life.  This can include things such as difficulty with transitions and inflexible behaviors.  These behaviors will however be frequent enough to be noticed by those around them.  When these behaviors are interrupted, the individual will become frustrated and have difficulty with being redirected from the item of interest."
    },
    {
        heading: "Level 3: Requiring Very Substantial Support",
        social: "An individual with this diagnosis will have severe deficits in social communication, that will include both verbal and nonverbal communication.  This causes severe limitations in social interactions with others and will have very little response to social interactions from others.",
        behavior: "An individual with this diagnosis will have inflexible behaviors, very restrictive routines/rituals, extreme difficulty change and transitions, or other restricted behaviors that severely interfere with functioning in all areas. The individual will have extreme difficulty with being redirected from an item of interest."
    }
];

// Function to construct Login page of the UI
class AddChild extends React.Component {
    state = {
        showModal: false,
        level: 0,
    }
    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal});
    }
  
    handleClick = (event) =>{
        console.log("handleClick entered... id=" + event.target.id);
        this.setState({ level: event.target.id, showModal: true});
    }

    render = () => {

        return (
            <React.Fragment>
            <Modal heading={levels[this.state.level].heading} open={this.state.showModal} onClose={this.toggleModal}>
                <br></br>
                <p><span style={styles.levelheader}>Social: </span><span>{levels[this.state.level].social}</span></p>
                <br></br>
                <p><span style={styles.levelheader}>Behavior/Interest: </span><span>{levels[this.state.level].behavior}</span></p>
            </Modal>
            
            <p style={styles.header}>Add a child</p>         
            <div style={styles.container}>
                <Formik
                    initialValues={{ firstname: '', 
                                    middlename: '', 
                                    lastname: '', 
                                    age: '', 
                                    dob: "",
                                    primarycareprovider: "",
                                    interventions: "",
                                    med1: "",
                                    freq1: "",
                                    dos1: "",
                                    med2: "",
                                    freq2: "",
                                    dos2: "",
                                    med3: "",
                                    freq3: "",
                                    dos3: "",
                                    med4: "",
                                    freq4: "",
                                    dos4: "",
                                    med5: "",
                                    freq5: "",
                                    dos5: "",
                                    med6: "",
                                    freq6: "",
                                    dos6: "",
                                    med7: "",
                                    freq7: "",
                                    dos7: "",
                                    med8: "",
                                    freq8: "",
                                    dos8: "",
                                    med9: "",
                                    freq9: "",
                                    dos9: "",
                                    med10: "",
                                    freq10: "",
                                    dos10: "",
                                    autsimlevel: "",
                                    cofactors: "",
                                    schoolaccomodations: ""
                                    }}
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
                        console.log(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        //this.toggleModal();
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
                                <Field component="select" name="interventions">
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
                                </Field>
                                
                                <hr />

                                <p style={styles.subheader}>Current medications</p> 
                                
                                <div>
                                    <label  style={Object.assign({}, styles.mlabel, styles.mNameLabel)} htmlFor="name">Name</label>
                                    <label  style={Object.assign({}, styles.mlabel, styles.mFreqField)} htmlFor="frequency">Freq</label>
                                    <label  style={Object.assign({}, styles.mlabel, styles.mDosField)} htmlFor="dosage">Dosage</label>
                                </div>
                                <div>                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mNameField)} type="text" name="med1" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mFreqField)} type="text" name="freq1" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mDosField)} type="text" name="dos1" />
                                </div>
                                <div>                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mNameField)} type="text" name="med2" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mFreqField)} type="text" name="freq2" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mDosField)} type="text" name="dos2" />
                                </div>
                                <div>                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mNameField)} type="text" name="med3" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mFreqField)} type="text" name="freq3" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mDosField)} type="text" name="dos3" />
                                </div>
                                <div>                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mNameField)} type="text" name="med4" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mFreqField)} type="text" name="freq4" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mDosField)} type="text" name="dos4" />
                                </div>
                                <div>                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mNameField)} type="text" name="med5" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mFreqField)} type="text" name="freq5" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mDosField)} type="text" name="dos5" />
                                </div>
                                <div>                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mNameField)} type="text" name="med6" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mFreqField)} type="text" name="freq6" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mDosField)} type="text" name="dos6" />
                                </div>
                                <div>                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mNameField)} type="text" name="med7" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mFreqField)} type="text" name="freq7" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mDosField)} type="text" name="dos7" />
                                </div>
                                <div>                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mNameField)} type="text" name="med8" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mFreqField)} type="text" name="freq8" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mDosField)} type="text" name="dos8" />
                                </div>
                                <div>                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mNameField)} type="text" name="med9" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mFreqField)} type="text" name="freq9" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mDosField)} type="text" name="dos9" />
                                </div>
                                <div>                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mNameField)} type="text" name="med10" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mFreqField)} type="text" name="freq10" />                            
                                    <Field style={Object.assign({}, styles.mfield, styles.mDosField)} type="text" name="dos10" />
                                </div>

                                <hr />

                                <p style={styles.subheader}>Behaviorial overview</p>                            

                                <div>
                                    <label style={styles.label} htmlFor="autsimlevel">Level of Autism Diagnosis</label>
                                </div>

                                <Field component="div" name="autsimlevel">
                                    <div>
                                        <label style={styles.rlabel}>
                                            <input style={styles.radio}
                                                name="autsimlevel"
                                                id="0"
                                                type="radio"
                                                value="Level 1"
                                                onClick={this.handleClick}
                                            />
                                            Level 1: Requiring Support Social
                                        </label>
                                    </div>

                                    <div>
                                        <label style={styles.rlabel}>
                                            <input style={styles.radio}
                                                name="autsimlevel"
                                                id="1"
                                                type="radio"
                                                value="level 2"
                                                onClick={this.handleClick}
                                            />
                                            Level 2: Requiring Substantial Support Social
                                        </label>
                                    </div>

                                    <div>
                                        <label style={styles.rlabel}>
                                            <input style={styles.radio}
                                                name="autsimlevel"
                                                id="2"
                                                type="radio"
                                                value="Level 3"
                                                onClick={this.handleClick}
                                            />
                                            Level 3: Requiring Very Substantial Support Social
                                        </label>
                                    </div>
                                </Field>
                                    
                                <div>
                                    <label style={Object.assign({}, styles.label, styles.cofactorlabel)} htmlFor="cofactors">Co-Factors</label>
                                </div>
                                
                                <Field component="select" style={styles.label} name="cofactors">
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
                                </Field>

                                <hr />

                                <p style={styles.subheader}>School overview</p>
                                <div>
                                    <label style={styles.label} htmlFor="schoolaccomodations">School accomodations</label>
                                </div> 
                                
                                <Field component="select" style={styles.label} name="schoolaccomodations">
                                    <option>Visual schedule</option>
                                    <option>Adaptive Devices</option>
                                    <option>Extra time</option>
                                    <option>Frequent feedback</option>
                                    <option>Opportunity for pull out time</option>
                                    <option>Sensory Breaks</option>
                                    <option>Aide Provided</option>
                                    <option>Other</option>
                                </Field> 

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