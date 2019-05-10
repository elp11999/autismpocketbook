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
import Notes from "../Notes";

class Calendar extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    value: "",
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
    this.setState({ title: "Sam's note"});  
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
        <Notes heading={"Notes for Sam"}
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
