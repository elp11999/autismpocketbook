//
// DashBoard page
//
// DashBoard.js
//

// Import the React library
import React from "react";

// Import Excel export library
import ReactExport from "react-export-excel";

// Import Calendar component
import Calendar from "../components/Calendar";

// Import the API library
import API from "../utils/API";

// Create Excel report components
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

var multiDataSet = [
  {
      columns: ["Date", "Behavior", "Exercise", "Mood", "Nutrition" , "Sensory Regulation", "Sleep", "Weather", "Notes"],
      data : []
  }
];

const styles = {
    dashnav: {
      marginBottom: 10,      
      background: "#fafbfc",      
      width: "100%",
      height: 60 ,      
      display: "flex",
      alignItems: "center"    
    },
    dashimage: {
      marginLeft: 10,
      borderRadius: "50%"
    },
    dashbutton: {
        fontSize: "0.9rem",
        backgroundColor: "#2C3E50",
        color: "white",
        marginLeft: 10,
        padding: 8,
        borderRadius: 5, 
        ":hover": {
          background: "blue"
        }
    }
}

// Function to construct Login page of the UI
class DashBoard extends React.Component {

  state = {
      id: "",
      child: "",
      showReportButton: false,
      showCalendar: false,
      multiDataSet: []
  }

  componentDidMount() {

    // Load local storage
    let apbSystem = JSON.parse(localStorage.getItem("apbSystem"));

    // Get all children
    API.getChildren(apbSystem.pid)
    .then(res =>  {
        console.log(res.data);
        if (res.data.length > 0) {
          // Set child's id
          apbSystem.cid = res.data[0]._id;
          this.setState({id: res.data[0]._id});

          // Update local storage
          localStorage.setItem("apbSystem", JSON.stringify(apbSystem));

          // Set child's name   
          this.setState({child: res.data[0].firstname});

          // Show calendar        
          this.setState({showCalendar: true});
        }
    })
    .catch(err => {
        console.log(err);
    });
  }
  
  handleEditOnClick = (event) => {
    console.log("handleEditOnClick: entered.");
  }

  handleReportsOnClick = (event) => {

    // Get Notes
    API.getNotes(this.state.id)
    .then(res =>  {
        console.log(this.state.child);
        if (res.data.length > 0) {
          res.data.sort((a, b) => (a.start < b.start) ? 1 : -1);
          res.data.forEach((note) => {
            multiDataSet[0].data.push([
                {value: note.start},
                {value: note.behavior},
                {value: note.exercise},
                {value: note.mood},
                {value: note.nutrition},
                {value: note.sensoryregulation},
                {value: note.sleep},
                {value: note.weather},
                {value: note.notes}
            ]);
            this.setState({multiDataSet: multiDataSet});
          });          
          console.log(multiDataSet);
        }
    })
    .catch(err => {
        console.log(err);
    });
    this.setState({showReportButton: true});
  }

  handleDownloadOnClick = (event) => {
    this.setState({showReportButton: false});
  }

  handleChartsOnClick = (event) => {
    this.props.history.push("/charts");
  }
    
  render = () => {
    let download = null;
    let calendar = null;    

    if (this.state.showReportButton) {
      download = 
        <ExcelFile element={<button style={styles.dashbutton} onClick={this.handleDownloadOnClick}>Download Report</button>}>

            <ExcelSheet dataSet={this.state.multiDataSet} name={this.state.child + "'s Notes"}>
            </ExcelSheet>

        </ExcelFile>;
    }
    if (this.state.showCalendar) {
      calendar = <Calendar child={this.state.child} />
    }

    return (
      <React.Fragment>
        {download}         
        <div style={styles.dashnav}>
          <img style={ styles.dashimage } src="/Sam1.jpeg" alt="thumbnail" width="50" height="50"></img>
          <button style={styles.dashbutton} type="submit" onClick={this.handleEditOnClick}>Edit</button>
          <button style={styles.dashbutton} type="submit" onClick={this.handleReportsOnClick}>Reports</button>
          <button style={styles.dashbutton} type="submit" onClick={this.handleChartsOnClick}>Charts</button>
        </div>
        {calendar}
      </React.Fragment> 
    );
  }
}

// Export the DashBoard UI page
export default DashBoard;
