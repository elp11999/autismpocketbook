//
// Notes UI component
//
// index.js
//

// Import the React library
import React from "react";

// Import the React-Dom library
import ReactDOM from "react-dom";

// Import the Formik library
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Import the Custom CSS for this component
import "./index.css";

//
// Example of multiple inline style objects
// <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="mood">Mood:</label>
//

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

        if (this.props.open) {
            return (            
                <React.Fragment>
                    <p className="notes-mainheader">{this.props.heading}</p>         
                    <div className="notes-container">
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
                                            <label className="notes-label" htmlFor="mood">Mood:</label>
                                            <Field
                                                className="notes-select"
                                                component="select"
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
                                            <label className="notes-label" htmlFor="exercise">Exercise:</label>
                                            <Field
                                                className="notes-select"
                                                component="select"
                                                name="exercise"
                                                >
                                                {exerciseList.map(s => (
                                                    <option key={s} value={s}>
                                                    {s}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>

                                        <div>
                                            <label className="notes-label" htmlFor="weather">Weather:</label>
                                            <Field
                                                className="notes-select"
                                                component="select"
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
                                            <label className="notes-label" htmlFor="sleep">Sleep:</label>
                                            <Field
                                                className="notes-select"
                                                component="select"
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
                                            <label className="notes-label" htmlFor="sensoryregulation">Sensory Regulation:</label>
                                            <Field
                                                className="notes-select"
                                                component="select"
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
                                            <label className="notes-label" htmlFor="behavior">Behavior:</label>
                                            <Field
                                                className="notes-select"
                                                component="select"
                                                name="behavior"
                                                size="2"
                                                onChange={evt =>
                                                    setFieldValue(
                                                    "behavior",
                                                    [].slice
                                                        .call(evt.target.selectedOptions)
                                                        .map(option => option.value)
                                                    )
                                                }
                                                multiple={true}
                                                >
                                                {behaviorList.map(s => (
                                                    <option key={s} value={s}>
                                                    {s}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>
        
                                        <div>
                                            <label className="notes-label" htmlFor="nutrition">Nutrition:</label>
                                            <Field
                                                className="notes-select"
                                                component="select"
                                                name="nutrition"
                                                size="2"
                                                onChange={evt =>
                                                    setFieldValue(
                                                    "nutrition",
                                                    [].slice
                                                        .call(evt.target.selectedOptions)
                                                        .map(option => option.value)
                                                    )
                                                }
                                                multiple={true}
                                                >
                                                {nutritionList.map(s => (
                                                    <option key={s} value={s}>
                                                    {s}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>
        
                                        <div>
                                            <label className="notes-label" htmlFor="notes">Notes:</label>
                                            <Field className="notes-textarea" component="textarea" rows="10" cols="50" name="notes"></Field>
                                        </div>

                                        <div>
                                            <button className="notes-button" type="submit" disabled={isSubmitting}>Save</button>
                                            <button className="notes-button" onClick={this.props.onCancel}>Cancel</button>
                                        </div>
                                        <div className="notes-messageDiv">                                 
                                            <ErrorMessage className="notes-message" name="notes" component="div" />
                                        </div>  
                                    </Form>
                                </div>
                            )}
                        </Formik>
                    </div> 
                </React.Fragment>
            );
        } else {
            return(null);
        }
    }
}

// Export the Notes component
export default Notes;