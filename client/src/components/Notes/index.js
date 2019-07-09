//
// Notes UI component
//
// index.js
//

// Import the React library
import React from "react";
import ReactDOM from "react-dom";

// Import the Formik library
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Inline styles for the Notes component
const styles = {
    nav: {
      fontSize: "1rem",
      padding: "0.2em 0.2em",
      backgroundColor: "blue"
    },
    h1: {
      fontSize: "1.3em",
      color: "white",
      display: "flex",
      justifyContent: "center"
    },
    container: {
      position: "fixed",
      top: "50%",
      left: "50%",
      background: "white",
      border: "1px solid #ccc",
      borderRadius: 8,
      padding: 20,
      maxWidth: 600,
      transform: "translate(-50%, -50%)",
      zIndex: 1
    },
    errorMessageDiv: {
        textAlign: "center",
        marginTop: 10
    },
    errorMessage: {
        fontSize: "1.5rem",
        color: 'red'
    },
    button: {
      fontSize: "1rem",
      backgroundColor: "blue",
      color: "white",
      marginTop: 10,
      padding: 5,      
      float: "right"
    },
    label: {
        fontSize: "1.1rem",
        fontWeight: 500,
        marginTop: 10,
        marginRight: 5,
        marginBottom: 5
  
    },
    moodlabel: {
        fontWeight: 600
    },
    notesarea: {
      marginTop: 0,    
      border: ".5px solid #ccc",    
      display: "block",
    }
}

const moodList = [
    "Calm",
    "Sad",
    "Anxious",
    "Happy",
    "Frustrated"
];

const sleepList = [
    "Well Rested",
    "Woke up",
    "Woke up several times"
];

const nutritionList = [
    "Full Meals/Balanced Diet",
    "Skipped Meals",
    "Supplements taken",
    "Probiotic",
    "Prebiotic",
    "Regular Bowel Movements"
];

const behaviorList = [
    "No issues",
    "On task",
    "Minor issues 2-3 a day",
    "Disruptive",
    "Motor/Verbal stimming",
    "Severe meltdown",
    "Elopement",
    "Property Destruction",
    "Self-Injurious Behavior"
];

const sensoryregulationList = [
    "High",
    "Moderate",
    "Low"
];

const exerciseList = [
    "High",
    "Moderate",
    "Low"
];

const weatherList = [
    "Sunny",
    "Cloudy",
    "Rain/Snow"
];

let nutritionSelection = [];
let behaviorSelection = [];


class Notes extends React.Component {

    render() {

      nutritionSelection = this.props.data.nutrition;
      behaviorSelection = this.props.data.behavior;

      return ( 
        this.props.open
        ? ReactDOM.createPortal(
            <div style={styles.container}>            
                <div style={styles.nav}><h1 style={styles.h1}>{this.props.heading}</h1></div>
                <Formik 
                    initialValues={{ mood: this.props.data.mood, 
                                    sleep: this.props.data.sleep, 
                                    nutrition: nutritionSelection, 
                                    behavior: behaviorSelection, 
                                    sensoryregulation: this.props.data.sensoryregulation,
                                    exercise: this.props.data.exercise,
                                    weather: this.props.data.weather,
                                    notes: this.props.data.notes,
                                    }}
                    validate={values => {
                        let errors = {};
                        if (!values.notes)
                            errors.notes = 'Notes are required!!';
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                        setSubmitting(false);
                        console.log(this.props);

                        values.title = this.props.title;
                        values.start = this.props.start;
                        values.allDay = this.props.allDay; 
                        console.log(JSON.stringify(values, null, 2)); 

                        // Save note to database                        
                        this.props.onSave(values);
                        }, 400);
                    }}
                    >
                    {({ prop, values, isSubmitting, setFieldValue }) => (
                        <div>
                            <Form>
                                <div>
                                    <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="mood">Mood:</label>
                                    <Field
                                        component="select"
                                        style={styles.label}
                                        name="mood"
                                        >
                                        {moodList.map(s => (
                                            <option key={s} value={s}>
                                            {s}
                                            </option>
                                        ))}
                                    </Field>
                                </div>

                                <div>
                                    <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="sleep">Sleep:</label>
                                    <Field
                                        component="select"
                                        style={styles.label}
                                        name="sleep"
                                        >
                                        {sleepList.map(s => (
                                            <option key={s} value={s}>
                                            {s}
                                            </option>
                                        ))}
                                    </Field>
                                </div>

                                <div>
                                    <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="nutrition">Nutrition:</label>
                                    <Field
                                        component="select"
                                        style={styles.label}
                                        name="nutrition"
                                        onChange={evt =>
                                            setFieldValue(
                                            "nutrition",
                                            [].slice
                                                .call(evt.target.selectedOptions)
                                                .map(option => option.value)
                                            )
                                        }
                                        multiple={false}
                                        >
                                        {nutritionList.map(s => (
                                            <option key={s} value={s}>
                                            {s}
                                            </option>
                                        ))}
                                    </Field>
                                </div>

                                <div>
                                    <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="behavior">Behavior:</label>
                                    <Field
                                        component="select"
                                        style={styles.label}
                                        name="behavior"
                                        onChange={evt =>
                                            setFieldValue(
                                            "behavior",
                                            [].slice
                                                .call(evt.target.selectedOptions)
                                                .map(option => option.value)
                                            )
                                        }
                                        multiple={false}
                                        >
                                        {behaviorList.map(s => (
                                            <option key={s} value={s}>
                                            {s}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                
                                <div>
                                    <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="sensoryregulation">Sensory Regulation:</label>
                                    <Field
                                        component="select"
                                        style={styles.label}
                                        name="sensoryregulation"
                                        >
                                        {sensoryregulationList.map(s => (
                                            <option key={s} value={s}>
                                            {s}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                
                                <div>
                                    <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="exercise">Exercise:</label>
                                    <Field
                                        component="select"
                                        style={styles.label}
                                        name="exercise"
                                        >
                                        {exerciseList.map(s => (
                                            <option key={s} value={s}>
                                            {s}
                                            </option>
                                        ))}
                                    </Field>

                                    <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="weather">Weather:</label>
                                    <Field
                                        component="select"
                                        style={styles.label}
                                        name="weather"
                                        >
                                        {weatherList.map(s => (
                                            <option key={s} value={s}>
                                            {s}
                                            </option>
                                        ))}
                                    </Field>
                                </div>

                                <div>
                                    <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="notes">Notes:</label>
                                    <Field component="textarea" rows="5" cols="50" style={styles.notesarea} name="notes"></Field>
                                </div>

                                <div>
                                    <button style={styles.button} onClick={this.props.onCancel}>Cancel</button>
                                </div>

                                <div>
                                    <button style={styles.button} type="submit" disabled={isSubmitting}>Save</button>
                                </div>
                                <div style={styles.errorMessageDiv}>                                 
                                    <ErrorMessage style={styles.errorMessage} name="notes" component="div" />
                                </div>  
                            </Form>
                        </div>
                    )}
                </ Formik>
            </div>,
            document.querySelector("#modal")
        )
        : null
      );
    }
}

// Export the Notes component
export default Notes;