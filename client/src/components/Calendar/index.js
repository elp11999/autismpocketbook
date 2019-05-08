import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

// Import calendar style sheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

// Import custom style sheets
import "./styles.css";

// Import the Formik library
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Import the Modal component
import Modal from "../Modal";

// Inline styles
const styles = {
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
};

class Calendar extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    showModal: false,
    clickFunction: this.handleDateClick,
    level: 0,
    calendarWeekends: true,
    title: "",
    start: null,
    allDay: null,
    calendarEvents: [
      // initial event data
      //{ title: "Note", start: new Date(), allDay: true }
    ],
    plugins: [
       dayGridPlugin,
       timeGridPlugin, 
       interactionPlugin
    ]
  };

  toggleModal = () => {
      this.setState({ showModal: !this.state.showModal});
      console.log("We are here showModal=" + this.state.showModal);
      if (this.state.showModal) {
        this.setState({
          // add new event data
          calendarEvents: this.state.calendarEvents.concat({
            // creates a new array
            title:  "New Note",
            start: this.state.start,
            allDay: this.state.allDay
          })
        });
      }
  }

  handleEventClick = (arg) => {
    console.log("handleEventClick" , arg);
  }

  handleDateClick = (arg) => {
    this.toggleModal();
    this.setState({ title: "New Note"});  
    this.setState({ start: arg.date}); 
    this.setState({ allDay: arg.allDay}); 
  }

/*
        <div className="demo-app-top">
          <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
          <button onClick={this.gotoPast}>go to a date in the past</button>
          &nbsp; (also, click a date/time to add an event)
        </div>
*/

  render() {
    return (
    
      <React.Fragment>
        <div className="demo-app">
          <div className="demo-app-calendar">
            <FullCalendar
              defaultView="dayGridMonth"
              header={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
              }}
              plugins={this.state.plugins}
              ref={this.calendarComponentRef}
              weekends={this.state.calendarWeekends}
              events={this.state.calendarEvents}
              dateClick={this.handleDateClick}
              eventClick={this.handleEventClick}
            />
          </div>
        </div>
        <Modal heading={"Notes for Sam"} open={this.state.showModal} onClose={this.toggleModal}>
            <Formik>
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
                    <option>Rains/now</option>
                  </Field>
                </div>

                <div>
                  <label style={Object.assign({}, styles.label, styles.moodlabel)} htmlFor="notes">Notes:</label>
                  <textarea rows="5" cols="50" style={styles.notesarea} value="Sam is having a great day!!!" name="notes"></textarea>
                </div>

              </Form>
            </ Formik>
        </Modal>

      </React.Fragment>
    );
  }

  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends
    });
  };

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
  };
}

export default Calendar;
