//
// Add/Update Child page
//
// AddChild.js
//

// Import the React library
import React from "react";

// Import the Formik library
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Import the Modal UI component
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

const schoolAccomodationsList = [
    "Visual schedule",
    "Adaptive Devices",
    "Extra time",
    "Frequent feedback",
    "Opportunity for pull out time",
    "Sensory Breaks",
    "Aide Provided",
    "Other",
];

const interventionsList = [
    "Applied Behavior Analysis",
    "Speech Therapy",
    "Occupational Therapy",
    "Music Therapy",
    "Physical Therapy",
    "Feeding Therapy",
    "Social Skills Therapy",
    "Medication Management",
    "Biomedical treatment",
    "Nutritional Interventions",
    "Other"
];

const cofactorsList = [
    "ADD",
    "ADHD",
    "Anxiety Depression",
    "OCD",
    "Gifted",
    "Tourette’s Auditory Processing",
    "Expressive Language Delay",
    "Learning Difficulties",
    "Seizures",
    "Food Allergies",
    "Other"
];

let schoolAccomodationsSelection = [];
let interventionsSelection = [];
let cofactorsSelection = [];
let autismSelection;

class AddChild extends React.Component {
    state = {
        showModal: false,
        levelID: 0,
        data: ""
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal});
    }
  
    handleClick = (event) => {
        autismSelection = event.target.value;
        this.setState({ levelID: event.target.id, showModal: true});
    }

    render = () => {

        schoolAccomodationsSelection = this.props.data.schoolaccomodations;
        interventionsSelection = this.props.data.interventions;
        cofactorsSelection = this.props.data.cofactors;
        autismSelection = this.props.data.autsimlevel;

        return (
            <React.Fragment>

                <Modal heading={levels[this.state.levelID].heading} open={this.state.showModal} onClose={this.toggleModal}>
                    <br></br>
                    <p><span style={styles.levelheader}>Social: </span><span>{levels[this.state.levelID].social}</span></p>
                    <br></br>
                    <p><span style={styles.levelheader}>Behavior/Interest: </span><span>{levels[this.state.levelID].behavior}</span></p>
                </Modal>                
            
                <p style={styles.header}>{this.props.header}</p>         
                <div style={styles.container}> 

                    <Formik
                        initialValues={{ 
                            firstname: this.props.data.firstname, 
                            middlename: this.props.data.middlename, 
                            lastname: this.props.data.lastname, 
                            age: this.props.data.age, 
                            dob: this.props.data.dob,
                            primarycareprovider: this.props.data.dob,
                            interventions: interventionsSelection,
                            med1: this.props.data.med1,
                            freq1: this.props.data.freq1,
                            dos1: this.props.data.dos1,
                            med2: this.props.data.med2,
                            freq2: this.props.data.freq2,
                            dos2: this.props.data.dos2,
                            med3: this.props.data.med3,
                            freq3: this.props.data.freq3,
                            dos3: this.props.data.dos3,
                            med4: this.props.data.med4,
                            freq4: this.props.data.freq4,
                            dos4: this.props.data.dos4,
                            med5: this.props.data.med5,
                            freq5: this.props.data.freq5,
                            dos5: this.props.data.dos5,
                            med6: this.props.data.med6,
                            freq6: this.props.data.freq6,
                            dos6: this.props.data.dos6,
                            med7: this.props.data.med7,
                            freq7: this.props.data.freq7,
                            dos7: this.props.data.dos7,
                            med8: this.props.data.med8,
                            freq8: this.props.data.freq8,
                            dos8: this.props.data.dos8,
                            med9: this.props.data.med9,
                            freq9: this.props.data.freq9,
                            dos9: this.props.data.dos9,
                            med10: this.props.data.med10,
                            freq10: this.props.data.freq10,
                            dos10: this.props.data.dos10,
                            autsimlevel: autismSelection,
                            cofactors: cofactorsSelection,
                            schoolaccomodations: schoolAccomodationsSelection
                        }}
                        validate={values => {
                            let errors = {};
                            if (!values.firstname)
                                errors.firstname = 'First name required!!';
                            else if (!values.middlename)
                                errors.firstname = 'Middle name required!!';
                            else if (!values.lastname)
                                errors.firstname = 'Last name required!!';
                            else if (!values.age)
                                errors.firstname = 'Age of autisim diagnosis required!!';
                            else if (!values.dob)
                                errors.firstname = 'Date of birth required!!';
                            else if (!values.primarycareprovider)
                                errors.firstname = 'Primary care provider required!!';
                            else if (!values.interventions || values.interventions.length === 0)
                                errors.firstname = 'Intervention value required!!';
                            else if (!values.schoolaccomodations || values.schoolaccomodations.length === 0)
                                errors.firstname = 'School acommodation value required!!';
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                setSubmitting(false);
                                this.props.onProfileSave(values);

                            }, 400);
                        }}
                        render={({ prop, values, isSubmitting, setFieldValue }) => (
                            
                            <Form>
                            
                                <p style={styles.subheader}>Basic information</p> 
                                <div>
                                    <label style={styles.label} htmlFor="firstname">First name</label>
                                </div>
                                <Field style={styles.field} type="text" name="firstname" />

                                <div>
                                    <label style={styles.label} htmlFor="middlename">Middle name</label>
                                </div>
                                <Field style={styles.field} type="text" name="middlename" />

                                <div>
                                    <label  style={styles.label} htmlFor="lastname">Last name</label>
                                </div>
                                <Field style={styles.field} type="text" name="lastname" />

                                <div>
                                    <label  style={styles.label} htmlFor="dob">Date of birth</label>
                                </div>
                                <Field style={styles.field} type="text" name="dob" />

                                <hr />

                                <p style={styles.subheader}>Medical overview</p> 

                                <div>
                                    <label  style={styles.label} htmlFor="age">Age of autism diagnosis</label>
                                </div>
                                <Field style={styles.field} type="text" name="age" />

                                <div>
                                    <label style={styles.label} htmlFor="primarycareprovider">Primary care provider</label>
                                </div>
                                <Field style={styles.field} type="text" name="primarycareprovider" />
                                
                                <div>
                                    <label style={styles.label} htmlFor="interventions">Current interventions</label>
                                </div>
                                <Field
                                    component="select"
                                    style={styles.label}
                                    name="interventions"
                                    onChange={evt =>
                                        setFieldValue(
                                        "interventions",
                                        [].slice
                                            .call(evt.target.selectedOptions)
                                            .map(option => option.value)
                                        )
                                    }
                                    multiple={true}
                                    >
                                    {interventionsList.map(s => (
                                        <option key={s} value={s}>
                                        {s}
                                        </option>
                                    ))}
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
                                                defaultChecked={autismSelection === "Level 1"}
                                                onChange={this.handleClick}
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
                                                value="Level 2"
                                                defaultChecked={autismSelection === "Level 2"}
                                                onChange={this.handleClick}
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
                                                defaultChecked={autismSelection === "Level 3"}
                                                onChange={this.handleClick}
                                            />
                                            Level 3: Requiring Very Substantial Support Social
                                        </label>
                                    </div>
                                </Field>
                                    
                                <div>
                                    <label style={Object.assign({}, styles.label, styles.cofactorlabel)} htmlFor="cofactors">Co-Factors</label>
                                </div>

                                <Field
                                    component="select"
                                    style={styles.label}
                                    name="cofactors"
                                    onChange={evt =>
                                        setFieldValue(
                                        "cofactors",
                                        [].slice
                                            .call(evt.target.selectedOptions)
                                            .map(option => option.value)
                                        )
                                    }
                                    multiple={true}
                                    >
                                    {cofactorsList.map(s => (
                                        <option key={s} value={s}>
                                        {s}
                                        </option>
                                    ))}
                                </Field>                        

                                <hr />
                                <p style={styles.subheader}>School overview</p>
                                <div>
                                    <label style={styles.label} htmlFor="schoolaccomodations">School accomodations</label>
                                </div> 
                                <Field
                                    component="select"
                                    style={styles.label}
                                    name="schoolaccomodations"
                                    onChange={evt =>
                                        setFieldValue(
                                        "schoolaccomodations",
                                        [].slice
                                            .call(evt.target.selectedOptions)
                                            .map(option => option.value)
                                        )
                                    }
                                    multiple={true}
                                    >
                                    {schoolAccomodationsList.map(s => (
                                        <option key={s} value={s}>
                                        {s}
                                        </option>
                                    ))}
                                </Field>

                                <hr />                                
                                <button style={styles.button} type="submit" disabled={isSubmitting}>{this.props.buttonLabel}</button>
                                <div style={styles.errorMessageDiv}>
                                    <ErrorMessage style={styles.errorMessage} name="firstname" component="div" />
                                </div> 
                                <hr />
                            </Form>
                        )}
                    />
                </div>
            </React.Fragment>
        );
    }
}

/*
const curSelection = ["foo"];
const availableSelection = ["foo", "bar", "john"];

// Function to construct Login page of the UI
class AddChild extends React.Component {
    state = {
        showModal: false,
        levelID: 0,
        autsimlevel: "",
        data: ""
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal});
    }
  
    handleClick = (event) => {
        this.setState({ levelID: event.target.id, showModal: true});
    }

    render = () => {
        JSON.stringify(this.props, null, 2);
        return (
            <React.Fragment>
                <Modal heading={levels[this.state.levelID].heading} open={this.state.showModal} onClose={this.toggleModal}>
                    <br></br>
                    <p><span style={styles.levelheader}>Social: </span><span>{levels[this.state.levelID].social}</span></p>
                    <br></br>
                    <p><span style={styles.levelheader}>Behavior/Interest: </span><span>{levels[this.state.levelID].behavior}</span></p>
                </Modal> 
            
            <p style={styles.header}>{this.props.header}</p>         
            <div style={styles.container}>
                <Formik
                    initialValues={{ firstname: this.props.data.firstname, 
                                    middlename: this.props.data.middlename, 
                                    lastname: this.props.data.lastname, 
                                    age: this.props.data.age, 
                                    dob: this.props.data.dob,
                                    primarycareprovider: this.props.data.dob,
                                    interventions: "Applied Behavior Analysis",
                                    med1: this.props.data.med1,
                                    freq1: this.props.data.freq1,
                                    dos1: this.props.data.dos1,
                                    med2: this.props.data.med2,
                                    freq2: this.props.data.freq2,
                                    dos2: this.props.data.dos2,
                                    med3: this.props.data.med3,
                                    freq3: this.props.data.freq3,
                                    dos3: this.props.data.dos3,
                                    med4: this.props.data.med4,
                                    freq4: this.props.data.freq4,
                                    dos4: this.props.data.dos4,
                                    med5: this.props.data.med5,
                                    freq5: this.props.data.freq5,
                                    dos5: this.props.data.dos5,
                                    med6: this.props.data.med6,
                                    freq6: this.props.data.freq6,
                                    dos6: this.props.data.dos6,
                                    med7: this.props.data.med7,
                                    freq7: this.props.data.freq7,
                                    dos7: this.props.data.dos7,
                                    med8: this.props.data.med8,
                                    freq8: this.props.data.freq8,
                                    dos8: this.props.data.dos8,
                                    med9: this.props.data.med9,
                                    freq9: this.props.data.freq9,
                                    dos9: this.props.data.dos9,
                                    med10: this.props.data.med10,
                                    freq10: this.props.data.freq10,
                                    dos10: this.props.data.dos10,
                                    autsimlevel: this.props.data.autsimlevel,
                                    cofactors: this.props.data.cofactors,
                                    schoolaccomodations: this.props.data.schoolaccomodations
                                    }}
                    validate={values => {
                        let errors = {};
                        if (!values.firstname)
                            errors.firstname = 'First name required!!';
                        else if (!values.middlename)
                            errors.middlename = 'Middle name required!!';
                        else if (!values.lastname)
                            errors.lastname = 'Last name required!!';
                        else if (!values.age)
                            errors.age = 'Age of autisim diagnosis required!!';
                        else if (!values.dob)
                            errors.dob = 'Date of birth required!!';
                        else if (!values.primarycareprovider)
                            errors.dob = 'Primary care provider required!!';
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            setSubmitting(false);
                            this.props.onProfileSave(values);

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

                                <div>
                                    <label style={styles.label} htmlFor="middlename">Middle name</label>
                                </div>
                                <Field style={styles.field} type="text" name="middlename" />

                                <div>
                                    <label  style={styles.label} htmlFor="lastname">Last name</label>
                                </div>
                                <Field style={styles.field} type="text" name="lastname" />

                                <div>
                                    <label  style={styles.label} htmlFor="dob">Date of birth</label>
                                </div>
                                <Field style={styles.field} type="text" name="dob" />

                                <hr />

                                <p style={styles.subheader}>Medical overview</p> 

                                <div>
                                    <label  style={styles.label} htmlFor="age">Age of autism diagnosis</label>
                                </div>
                                <Field style={styles.field} type="text" name="age" />

                                <div>
                                    <label style={styles.label} htmlFor="primarycareprovider">Primary care provider</label>
                                </div>
                                <Field style={styles.field} type="text" name="primarycareprovider" />
                                
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
                                                checked={this.props.data.autsimlevel === "Level 1"}
                                                onChange={this.handleClick}
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
                                                value="Level 2"
                                                checked={this.props.data.autsimlevel === "Level 2"}
                                                onChange={this.handleClick}
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
                                                checked={this.props.data.autsimlevel === "Level 3"}
                                                onChange={this.handleClick}
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
                                
                                <button style={styles.button} type="submit" disabled={isSubmitting}>{this.props.buttonLabel}</button>
                                <div style={styles.errorMessageDiv}>
                                    <ErrorMessage style={styles.errorMessage} name="firstname" component="div" />                                    
                                    <ErrorMessage style={styles.errorMessage} name="middlename" component="div" />                                    
                                    <ErrorMessage style={styles.errorMessage} name="lastname" component="div" />                                    
                                    <ErrorMessage style={styles.errorMessage} name="dob" component="div" />
                                    <ErrorMessage style={styles.errorMessage} name="age" component="div" />                                    
                                    <ErrorMessage style={styles.errorMessage} name="primarycareprovider" component="div" />
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
*/

// Export the AddChild UI page
export default AddChild;