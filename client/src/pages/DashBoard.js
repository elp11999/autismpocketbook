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

// Import ChildProfile component
import ChildProfile from "../components/ChildProfile";

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
      data: "",
      showReportButton: false,
      showDashboardButtons: false,
      showAddProfile: false,
      showUpdateProfile: false,
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
          this.setState({data: res.data[0]});

          // Update local storage
          localStorage.setItem("apbSystem", JSON.stringify(apbSystem));

          // Set child's name   
          this.setState({child: res.data[0].firstname});

          // Show Dashboard buttons        
          this.setState({showDashboardButtons: true});

          // Show calendar        
          this.setState({showCalendar: true});
        } else {

          // Hide Dashboard buttons        
          this.setState({showDashboardButtons: false});

          // Hide calendar        
          this.setState({showCalendar: false});

          // Show add profile
          this.setState({showAddProfile: true});

        }
    })
    .catch(err => {
        console.log(err);
    });
  }
  
  handleEditOnClick = (event) => {
    console.log("handleEditOnClick: entered.");      
    this.setState({showDashboardButtons: false});
    this.setState({showCalendar: false});
    this.setState({showUpdateProfile: true});
  }

  handleOnAddProfile = (profile) => {
    console.log("handleOnAddProfile"); 

    // Load local storage
    let apbSystem = JSON.parse(localStorage.getItem("apbSystem"));
                                            
    // Save Child to database
    API.saveChild(apbSystem.pid, profile)
    .then(res =>  {
        // Save child id
        this.setState({id: res.data.cid, child: res.data.child});
        apbSystem.cid = res.data.cid;
        localStorage.setItem("apbSystem", JSON.stringify(apbSystem));
        
        // Set new profile data        
        this.setState({data: profile});

        // Set new profile data        
        this.setState({data: profile});
        
        // Disable add profile component      
        this.setState({showAddProfile: false});
    
        // Show Dashboard buttons        
        this.setState({showDashboardButtons: true});
    
        // Show calendar        
        this.setState({showCalendar: true});
    })
    .catch(err => {
        console.log(err);
    });
  }

  handleOnUpdateProfile = (profile) => {
    console.log("handleOnUpdateProfile");

    // Load local storage
    //let apbSystem = JSON.parse(localStorage.getItem("apbSystem"));

    // Update child' profile
    API.updateChild(this.state.id, profile)
    .then(res =>  {
        // Set new profile data        
        this.setState({data: profile});
        
        // Disable edit profile component      
        this.setState({showUpdateProfile: false});
    
        // Show Dashboard buttons        
        this.setState({showDashboardButtons: true});
    
        // Show calendar        
        this.setState({showCalendar: true});
    })
    .catch(err => {
        console.log(err);
    });

  }  

  handleOnUpdateProfileCancel = (event) => {
        
    // Disable edit profile component      
    this.setState({showUpdateProfile: false});
    
    // Show Dashboard buttons        
    this.setState({showDashboardButtons: true});

    // Show calendar        
    this.setState({showCalendar: true});
  }

  handleReportsOnClick = (event) => {

    // Get Notes
    API.getNotes(this.state.id)
    .then(res =>  {
        if (res.data.notes.length > 0) {
          res.data.notes.sort((a, b) => (a.start < b.start) ? 1 : -1);
          res.data.notes.forEach((note) => {
            multiDataSet[0].data.push([
                {value: note.start},
                {value: note.behavior.join(",")},
                {value: note.exercise},
                {value: note.mood},
                {value: note.nutrition.join(",")},
                {value: note.sensoryregulation},
                {value: note.sleep},
                {value: note.weather},
                {value: note.notes}
            ]);
            this.setState({multiDataSet: multiDataSet});
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
    this.props.history.push("/charts");
  }

  handleLineChartsOnClick = (event) => {
    this.props.history.push("/linecharts");
  }

  handleLineCharts2OnClick = (event) => {
    this.props.history.push("/linecharts2");
  }
    
  render = () => {
    let download = null;
    let calendar = null;
    let dashBoardButtons = null;
    let addProfile = null;     
    let updateProfile = null;     

    if (this.state.showReportButton) {
      download = 
        <ExcelFile element={<button style={styles.dashbutton} onClick={this.handleDownloadOnClick}>Download Report</button>}>

            <ExcelSheet dataSet={this.state.multiDataSet} name={this.state.child + "'s Notes"}>
            </ExcelSheet>

        </ExcelFile>;
    }
    
    if (this.state.showCalendar) {
      calendar = <Calendar />
    }

    if (this.state.showDashboardButtons) {
      dashBoardButtons =         
        <div style={styles.dashnav}>
          <img style={ styles.dashimage } src="/Sam1.jpeg" alt="thumbnail" width="50" height="50"></img>
          <button style={styles.dashbutton} type="submit" onClick={this.handleEditOnClick}>Edit</button>
          <button style={styles.dashbutton} type="submit" onClick={this.handleReportsOnClick}>Reports</button>
          <button style={styles.dashbutton} type="submit" onClick={this.handleLineCharts2OnClick}>Charts</button>
        </div>
    }

    if (this.state.showAddProfile) {
      addProfile = <ChildProfile 
          header={"Add a child"}
          buttonLabel="Add Child"
          data={this.state.data}
          onProfileSave={this.handleOnAddProfile} />
    }

    if (this.state.showUpdateProfile) {
      updateProfile = <ChildProfile 
          header={"Update " + this.state.child + "'s profile"}
          buttonLabel="Update Profile"
          data={this.state.data}
          onProfileSave={this.handleOnUpdateProfile} 
          onProfileCancel={this.handleOnUpdateProfileCancel} />
    }

    return (
      <React.Fragment>
        {download}
        {dashBoardButtons}
        {calendar}
        {addProfile}
        {updateProfile}
      </React.Fragment> 
    );
  }
}

// Export the DashBoard UI page
export default DashBoard;
