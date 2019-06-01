//
// Notes UI component
//
// index.js
//

// Import the React library
import React from "react";
import ReactDOM from "react-dom";

// Import the Formik library
//import { Formik, Form, Field, ErrorMessage } from 'formik';
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

class Notes extends React.Component {

    render() {
        if (this.props.open) {
            console.log("hello");
            console.log(this.props.data);
        }
      return ( 
        this.props.open
        ? ReactDOM.createPortal(
            <div style={styles.container}>            
                <div style={styles.nav}><h1 style={styles.h1}>{this.props.heading}</h1></div>
                <Formik 
                    initialValues={{ mood: this.props.data.mood, 
                                    sleep: this.props.data.sleep, 
                                    nutrition: this.props.data.nutrition, 
                                    behavior: this.props.data.behavior, 
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
                    {({ isSubmitting }) => (
                        <div>
                            <Form>
                                <div>
                                    <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="mood">Mood:</label>
                                    <Field component="select" style={styles.label} name="mood">
                                        <option>Calm</option>
                                        <option>Sad</option>
                                        <option>Anxious</option>
                                        <option>Happy</option>
                                        <option>Frustrated</option>                                    
                                    </Field>
                                </div>

                                <div>
                                    <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="sleep">Sleep:</label>
                                    <Field component="select" style={styles.label} name="sleep">
                                        <option>Well rested</option>
                                        <option>Woke up</option>
                                        <option>Woke up several times</option>
                                    </Field>
                                </div>

                                <div>
                                    <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="nutrition">Nutrition:</label>
                                    <Field component="select" style={styles.label} name="nutrition">
                                        <option>Full Meals/Balanced Diet</option>
                                        <option>Skipped Meals</option>
                                        <option>Supplements taken</option>
                                        <option>Probiotic</option>
                                        <option>Prebiotic</option>
                                        <option>Regular Bowel Movements</option>
                                    </Field>
                                </div>

                                <div>
                                    <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="behavior">Behavior:</label>
                                    <Field component="select" style={styles.label} name="behavior">
                                        <option>No issues</option>
                                        <option>On task</option>
                                        <option>Minor issues 2-3 a day</option>
                                        <option>Disruptive</option>
                                        <option>Motor/Verbal stimming</option>
                                        <option>Severe meltdown</option>
                                        <option>Elopement</option>
                                        <option>Property Destruction</option>
                                        <option>Self-Injurious Behavior</option>
                                    </Field>
                                </div>
                                
                                <div>
                                    <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="sensoryregulation">Sensory Regulation:</label>
                                    <Field component="select" style={styles.label} name="sensoryregulation">
                                        <option>High</option>
                                        <option>Moderate</option>
                                        <option>Low</option>
                                    </Field>
                                </div>
                                
                                <div>
                                    <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="exercise">Exercise:</label>
                                    <Field component="select" style={styles.label} name="exercise">
                                        <option>Low</option>
                                        <option>Moderate</option>
                                        <option>High</option>
                                    </Field>

                                    <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="weather">Weather:</label>
                                    <Field component="select" style={styles.label} name="weather">
                                        <option>Sunny</option>
                                        <option>Cloudy</option>
                                        <option>Rain/Snow</option>
                                    </Field>
                                </div>

                                <div>
                                    <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="notes">Notes:</label>
                                    <Field component="textarea" rows="5" cols="50" style={styles.notesarea} value={this.props.data.notes} name="notes"></Field>
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