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

const defNoteData = {
    mood:  'Happy', 
    sleep: 'Well Rested', 
    nutrition: ['Full Meals/Balanced Diet'], 
    behavior: 'No issues', 
    sensoryregulation: "High",
    exercise: "High",
    weather: "Sunny",
    notes: ""
}

class Calendar extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    id: "",
    child: "",
    value: "",
    showCalendar: true,
    showNotes: false,
    dashboard: "",
    clickFunction: this.handleDateClick,
    level: 0,
    calendarWeekends: true,
    title: "",
    start: null,
    allDay: true,
    handleOnSave: null,
    data: defNoteData,
    notes: null,
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
    console.log(this.props);
    this.setState({dashboard: this.props.dashboard});

    // Load local storage
    let apbSystem = JSON.parse(localStorage.getItem("apbSystem"));

    if (apbSystem.cid === "") {
      console.log("No child here!!!");
    } else {

      // Set child's id
      this.setState({id: apbSystem.cid});

      // Get All Notes
      API.getNotes(apbSystem.cid)
      .then(res =>  {
          console.log(res.data);
          if (res.data.notes.length > 0) {
            res.data.notes.forEach((note) => {
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
          // Set child's name   
          this.setState({child: res.data.child});
      })
      .catch(err => {
          console.log(err);
      });
    }
  }

  handleDateClick = (arg) => {
    console.log("handleDateClick");
    this.setState({ title: this.state.child + "'s note"});  
    this.setState({ start: arg.date}); 
    this.setState({ allDay: arg.allDay});

    let noteDate = {
      "date" : arg.date
    }    

    // Get note for this day
    console.log(noteDate);
    API.getNote(this.state.id, noteDate)
    .then(res =>  {
      console.log(res.data);
        if (res.data.length > 0) {
          this.setState({ data: res.data[0] });
          this.setState({ handleOnSave: this.handleOnUpdate}); 
        } else {
          this.setState({ data: defNoteData });
          this.setState({ handleOnSave: this.handleOnSave}); 
        }
        this.setState({ showNotes: !this.state.showNotes});
        this.setState({ showCalendar: !this.state.showCalendar});
        this.state.dashboard.setState({showDashboardButtons: false});
    })
    .catch(err => {
        console.log(err);
    }); 
  }

  handleEventClick = (arg) => {
    console.log("handleEventClick");
    this.setState({ title: "Update " + this.state.child + "'s note"}); 
    this.setState({ start: arg.event.start}); 
    this.setState({ allDay: true});
    this.setState({ handleOnSave: this.handleOnUpdate});
    this.state.dashboard.setState({showDashboardButtons: false});

    let noteDate = {
      "date" : arg.event.start
    }

    // Get note for this day
    API.getNote(this.state.id, noteDate)
    .then(res =>  {
      console.log(res.data);
        if (res.data.length > 0) {
          this.setState({ data: res.data[0] });
        } else {
          this.setState({ data: defNoteData });
        }
        console.log("Showing modal...");
        this.setState({ showNotes: !this.state.showNotes});
        this.setState({ showCalendar: !this.state.showCalendar});
    })
    .catch(err => {
        console.log(err);
    });
  }

  handleOnCancel = (event) => {
    console.log("handleOnCancel"); 
    this.setState({ showNotes: !this.state.showNotes});
    this.setState({ showCalendar: !this.state.showCalendar});
    this.state.dashboard.setState({showDashboardButtons: true});
  }

  handleOnSave = (notes) => { 
    console.log("handleOnSave"); 
    this.setState({ showNotes: !this.state.showNotes});
    this.setState({ showCalendar: !this.state.showCalendar});
    this.state.dashboard.setState({showDashboardButtons: true});

    // Save new Note to database
    API.saveNote(this.state.id, notes)
    .then(res =>  {
        console.log(res.data);
        this.setState({
          // add new event data
          calendarEvents: this.state.calendarEvents.concat({
            // creates a new array
            title:  this.state.title,
            start: this.state.start,
            allDay: this.state.allDay
          })
        });
    })
    .catch(err => {
        console.log("Error adding a note!!!");
        console.log(err);
    });
  }

  handleOnUpdate = (notes) => { 
    console.log("handleOnUpdate");
    this.setState({ showNotes: !this.state.showNotes});
    this.setState({ showCalendar: !this.state.showCalendar});
    this.state.dashboard.setState({showDashboardButtons: true});

    // Update Note to database
    API.updateNote(this.state.data._id, notes)
    .then(res =>  {
        console.log(res.data);
    })
    .catch(err => {
        console.log("Error Update a note!!!");
        console.log(err);
    }); 
  }

  render() {
         
    let calendar = null;    
    
    if (this.state.showCalendar) {
      calendar = 
      <div className="demo-app">
        <div className="demo-app-calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: "prev,next",
              //left: "prev,next today",
              center: "title",
              right: "listWeek"
              //right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            plugins={this.state.plugins}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
            eventClick={this.handleEventClick}
          />
        </div>
      </div>;
    }

    return (
    
      <React.Fragment>
        {calendar}
        <Notes heading={this.state.title}
          title={this.state.child + "'s note"}
          start={this.state.start}
          allDay={this.state.allDay}
          data={this.state.data}
          open={this.state.showNotes}
          onSave={this.state.handleOnSave}
          onCancel={this.handleOnCancel}
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
