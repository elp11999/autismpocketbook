import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

// Import the API library
import API from "../../utils/API";

// Import calendar style sheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

// Import custom style sheets
import "./styles.css";
import Notes from "../Notes";

class Calendar extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    child: "",
    value: "",
    showModal: false,
    clickFunction: this.handleDateClick,
    level: 0,
    calendarWeekends: true,
    title: "",
    start: null,
    allDay: true,
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

  componentDidMount() {

    // Load local storage
    let apbSystem = JSON.parse(localStorage.getItem("apbSystem"));


    if (apbSystem.child === "") {
      console.log("No child here!!!");
    } else {

      // Set child's name   
      this.setState({child:apbSystem.child});

      // Get Notes
      console.log(apbSystem.child);
      API.getNotes(apbSystem.child)
      .then(res =>  {
        console.log(res.data);
          if (res.data.length > 0) {
            res.data.forEach((note) => {
              this.setState({
                // Add event data
                calendarEvents: this.state.calendarEvents.concat({
                  title:  note.title,
                  start: note.start,
                  allDay: note.allDay
                })
              });
            });
          }
      })
      .catch(err => {
          console.log(err);
      });
    }
  }

  handleOnChange = (event) => {
    console.log("handleOnChange: entered...");
     this.setState({value: event.target.value});
  }

  handleEventClick = (arg) => {
    console.log("handleEventClick" , arg);
  }

  handleOnCancel = (event) => {
    console.log("handleOnCancel"); 
    this.setState({ showModal: !this.state.showModal});
  }

  handleOnSave = (event) => { 
    console.log("handleOnSave"); 
    this.setState({ showModal: !this.state.showModal});
    this.setState({
      // add new event data
      calendarEvents: this.state.calendarEvents.concat({
        // creates a new array
        title:  this.state.title,
        start: this.state.start,
        allDay: this.state.allDay
      })
    });  
  }

  handleDateClick = (arg) => {
    console.log(arg);
    this.setState({ title: this.state.child + "'s note"});  
    this.setState({ start: arg.date}); 
    this.setState({ allDay: arg.allDay}); 
    this.setState({ showModal: !this.state.showModal});
  }

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
        <Notes heading={"Notes for " + this.state.child}
          title={this.state.title}
          start={this.state.start}
          allDay={this.state.allDay}
          open={this.state.showModal}
          onSave={this.handleOnSave}
          onCancel={this.handleOnCancel}
          onChange={this.handleOnChange}
        />

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
