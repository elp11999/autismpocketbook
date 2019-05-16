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
      height: 60     
    },
    dashbutton: {
        fontSize: "0.9rem",
        backgroundColor: "#2C3E50",
        color: "white",
        marginTop: 10,
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
      child: "",
      showReportButton: false
  }

  componentDidMount() {

    // Load local storage
    let apbSystem = JSON.parse(localStorage.getItem("apbSystem")); 
    
    // Set child's name   
    this.setState({child:apbSystem.child});
  }
  
  handleEditOnClick = (event) => {
    console.log("handleEditOnClick: entered.");
  }

  handleReportsOnClick = (event) => {

    // Get Notes
    API.getNotes(this.state.child)
    .then(res =>  {
        console.log(this.props);
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

          });
          console.log(multiDataSet);
          this.setState({showReportButton: true});
        }
    })
    .catch(err => {
        console.log(err);
    });
  }

  handleDownloadOnClick = (event) => {
    this.setState({showReportButton: false});
  }

  handleChartsOnClick = (event) => {
    console.log("handleChartsOnClick: entered.");
  }
    
  render = () => {
    let download = null;

    if (this.state.showReportButton) {
      download = 
        <ExcelFile element={<button style={styles.dashbutton} onClick={this.handleDownloadOnClick}>Download Report</button>}>

            <ExcelSheet dataSet={multiDataSet} name={this.state.child + "'s Notes"}>
            </ExcelSheet>

        </ExcelFile>;
    }

    return (
      <React.Fragment>
        {download}         
        <div style={styles.dashnav}>
          <button style={styles.dashbutton} type="submit" onClick={this.handleEditOnClick}>Edit</button>
          <button style={styles.dashbutton} type="submit" onClick={this.handleReportsOnClick}>Reports</button>
          <button style={styles.dashbutton} type="submit" onClick={this.handleChartsOnClick}>Charts</button>
        </div>
        <Calendar />
      </React.Fragment> 
    );
  }
}

// Export the DashBoard UI page
export default DashBoard;
