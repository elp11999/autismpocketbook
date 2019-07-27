//
// Add/Update Child page
//
// ChildView.js
//

// Import the React library
import React from "react";

// Import the Formik library
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Import the Autism Level Modal UI component
import Modal from "../Modal";

// Import custom css for this component
import "./index.css";

// Autism levels
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

class ChildView extends React.Component {
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
                    <p><span className="child-profile-levelheader">Social: </span><span>{levels[this.state.levelID].social}</span></p>
                    <br></br>
                    <p><span className="child-profile-levelheader">Behavior/Interest: </span><span>{levels[this.state.levelID].behavior}</span></p>
                </Modal>                
            
                <p className="child-profile-mainheader">{this.props.header}</p>         
                <div className="child-profile-container"> 

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
                            
                                <p className="child-profile-subheader">Basic information</p> 
                                <div>
                                    <label className="child-profile-text-label" htmlFor="firstname">First name</label>
                                </div>
                                <Field className="child-profile-text-field" type="text" name="firstname" />

                                <div>
                                    <label className="child-profile-text-label" htmlFor="middlename">Middle name</label>
                                </div>
                                <Field className="child-profile-text-field" type="text" name="middlename" />

                                <div>
                                    <label  className="child-profile-text-label" htmlFor="lastname">Last name</label>
                                </div>
                                <Field className="child-profile-text-field" type="text" name="lastname" />

                                <div>
                                    <label className="child-profile-text-label" htmlFor="dob">Date of birth</label>
                                </div>
                                <Field className="child-profile-text-field" type="text" name="dob" />

                                <hr />

                                <p className="child-profile-subheader">Medical overview</p> 

                                <div>
                                    <label className="child-profile-text-label" htmlFor="age">Age of autism diagnosis</label>
                                </div>
                                <Field className="child-profile-text-field" type="text" name="age" />

                                <div>
                                    <label className="child-profile-text-label" htmlFor="primarycareprovider">Primary care provider</label>
                                </div>
                                <Field className="child-profile-text-field" type="text" name="primarycareprovider" />
                                
                                <div>
                                    <label className="child-profile-text-label" htmlFor="interventions">Current interventions</label>
                                </div>
                                <Field
                                    component="select"
                                    className="child-profile-text-label"
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
                                <p className="child-profile-subheader">Current medications</p> 
                                
                                <div>
                                    <label className="mlabel mNameLabel" htmlFor="name">Name</label>
                                    <label className="mlabel mFreqLabel" htmlFor="frequency">Freq</label>
                                    <label className="mlabel mDosLabel" htmlFor="dosage">Dosage</label>
                                </div>
                                <div>                            
                                    <Field className="mfield mNameField" type="text" name="med1" />                            
                                    <Field className="mfield mFreqField" type="text" name="freq1" />                            
                                    <Field className="mfield mDosField" type="text" name="dos1" />
                                </div>
                                <div>                            
                                    <Field className="mfield mNameField" type="text" name="med2" />                            
                                    <Field className="mfield mFreqField" type="text" name="freq2" />                            
                                    <Field className="mfield mDosField" type="text" name="dos2" />
                                </div>
                                <div>                            
                                    <Field className="mfield mNameField" type="text" name="med3" />                            
                                    <Field className="mfield mFreqField" type="text" name="freq3" />                            
                                    <Field className="mfield mDosField" type="text" name="dos3" />
                                </div>
                                <div>                            
                                    <Field className="mfield mNameField" type="text" name="med4" />                            
                                    <Field className="mfield mFreqField" type="text" name="freq4" />                            
                                    <Field className="mfield mDosField" type="text" name="dos4" />
                                </div>
                                <div>                            
                                    <Field className="mfield mNameField" type="text" name="med5" />                            
                                    <Field className="mfield mFreqField" type="text" name="freq5" />                            
                                    <Field className="mfield mDosField" type="text" name="dos5" />
                                </div>
                                <div>                            
                                    <Field className="mfield mNameField" type="text" name="med6" />                            
                                    <Field className="mfield mFreqField" type="text" name="freq6" />                            
                                    <Field className="mfield mDosField" type="text" name="dos6" />
                                </div>
                                <div>                            
                                    <Field className="mfield mNameField" type="text" name="med7" />                            
                                    <Field className="mfield mFreqField" type="text" name="freq7" />                            
                                    <Field className="mfield mDosField" type="text" name="dos7" />
                                </div>
                                <div>                            
                                    <Field className="mfield mNameField" type="text" name="med8" />                            
                                    <Field className="mfield mFreqField" type="text" name="freq8" />                            
                                    <Field className="mfield mDosField" type="text" name="dos8" />
                                </div>
                                <div>                            
                                    <Field className="mfield mNameField" type="text" name="med9" />                            
                                    <Field className="mfield mFreqField" type="text" name="freq9" />                            
                                    <Field className="mfield mDosField" type="text" name="dos9" />
                                </div>
                                <div>                            
                                    <Field className="mfield mNameField" type="text" name="med10" />                            
                                    <Field className="mfield mFreqField" type="text" name="freq10" />                            
                                    <Field className="mfield mDosField" type="text" name="dos10" />
                                </div>

                                <hr />

                                <p className="child-profile-subheader">Behaviorial overview</p>                            

                                <div>
                                    <label className="child-profile-text-label" htmlFor="autsimlevel">Level of Autism Diagnosis</label>
                                </div>

                                <Field component="div" name="autsimlevel">
                                    <div>
                                        <label className="child-profile-radio-label">
                                            <input className="child-profile-radio-button"
                                                name="autsimlevel"
                                                id="0"
                                                type="radio"
                                                value="Level 1"
                                                defaultChecked={autismSelection === "Level 1"}
                                                onChange={this.handleClick}
                                            />
                                            Level 1: Moderate Support Social Needed
                                        </label>
                                    </div>

                                    <div>
                                        <label className="child-profile-radio-label">
                                            <input className="child-profile-radio-button"
                                                name="autsimlevel"
                                                id="1"
                                                type="radio"
                                                value="Level 2"
                                                defaultChecked={autismSelection === "Level 2"}
                                                onChange={this.handleClick}
                                            />
                                            Level 2: High Support Social Needed
                                        </label>
                                    </div>

                                    <div>
                                        <label className="child-profile-radio-label">
                                            <input className="child-profile-radio-button"
                                                name="autsimlevel"
                                                id="2"
                                                type="radio"
                                                value="Level 3"
                                                defaultChecked={autismSelection === "Level 3"}
                                                onChange={this.handleClick}
                                            />
                                            Level 3: Very High Support Social Needed
                                        </label>
                                    </div>
                                </Field>
                                    
                                <div>
                                    <label className="child-profile-text-label child-profile-cofactor-label" htmlFor="cofactors">Co-Factors</label>
                                </div>

                                <Field
                                    component="select"
                                    className="child-profile-text-label"
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
                                <p className="child-profile-subheader">School overview</p>
                                <div>
                                    <label className="child-profile-text-label" htmlFor="schoolaccomodations">School accomodations</label>
                                </div> 
                                <Field
                                    component="select"
                                    className="child-profile-text-label"
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
                                <div>
                                    <button className="child-profile-button" type="submit" disabled={isSubmitting}>{this.props.buttonLabel}</button>
                                    <button className="child-profile-button" type="button" onClick={this.props.onProfileCancel}>Cancel</button>
                                </div>
                                <div className="child-profile-errorMessageDiv">
                                    <ErrorMessage className="child-profile-errorMessage" name="firstname" component="div" />
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

// Export the ChildView UI page
export default ChildView;