//
// DashBoard page
//
// DashBoard.js
//

// Import the React library
import React from "react";

// Import Calendar component
import Calendar from "../components/Calendar";

// Import Excel export library
import ReactExport from "react-export-excel";

// Import the API library
import API from "../utils/API";

// Create Excel report components
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

var notesDataSet = [];

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
      showReportButton: false
  }
  
  handleEditOnClick = (event) => {
    console.log("handleEditOnClick: entered.");
  }

  handleReportsOnClick = (event) => {                           

    // Get Notes
    API.getNotes()
    .then(res =>  {
        console.log(this.props);
        if (res.data.length > 0) {
          notesDataSet = res.data;
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

            <ExcelSheet data={notesDataSet} name="Sam's Report">
                <ExcelColumn label="Behavior" value="behavior"/>
                <ExcelColumn label="Exercise" value="exercise"/>
                <ExcelColumn label="Mood" value="mood"/>
                <ExcelColumn label="Nutrition" value="nutrition"/>
                <ExcelColumn label="Sensory Regulation" value="sensoryregulation"/>
                <ExcelColumn label="Sleep" value="sleep"/>
                <ExcelColumn label="Weather" value="weather"/>
                <ExcelColumn label="Notes" value="notes"/>
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
