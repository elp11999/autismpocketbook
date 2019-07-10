// Import React library
import React from 'react';

// Import QueryString library
import queryString from 'query-string';

// Import React-D3 library
import { LineChart  } from 'react-charts-d3';

// Import the Formik library
import { Formik, Form, Field } from 'formik';

// Import the API library
import API from "../utils/API";

// Styling for UI components
const styles = {
    header: {
      fontSize: "2rem",
      color: "#eb6864",
      textAlign: "center",
      marginTop: 20,
      marginBottom: 20,
      fontWeight: 500,      
    },
    select: {
      fontSize: "1.0rem",
      textAlign: "center",
      alignContent : "center"
    },
    label: {
        fontSize: "1.5rem",
        color: "#eb6864",
        marginTop: 10,
        marginRight: 5,
        marginBottom: 5
  
    }
}

// Chart line colors
const colorScale = {
    from: '#c43333',
    to:   '#7040f5'
}

// List of months
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

// Axis controls for charts
const axisConfig = {
    showXAxis: true,
    showXAxisLabel: true,
    xLabel: 'Sam\'s Mood Chart for Year - 2019',
    xLabelPosition: 'left',
    showYAxis: true,
    showYAxisLabel: true,
    yLabel: 'Level',
    yLabelPosition: 'top',
};

// Margin controls for charts
const margin = {
    top: 20, 
    bottom: 30, 
    left: 60,
    right: 40
};

// Mood chart info
const moodInfo = {
    name : "mood",
    categories : [    
        "Happy",
        "Calm",
        "Sad",
        "Anxious",
        "Frustrated"
    ]
}

// Sleep chart info
const sleepInfo = {
    name : "sleep",
    categories : [ 
        "Well Rested",
        "Woke up",
        "Woke up several times"
    ]
}

// Nutrition info
const nutritionInfo = {
    name : "nutrition",
    categories : [ 
        "Full Meals/Balanced Diet",
        "Skipped Meals",
        "Supplements taken",
        "Probiotic",
        "Prebiotic",
        "Regular Bowel Movements"
    ]
}

// Behavior info
const behaviorInfo = {
    name : "behavior",
    categories : [ 
        "No issues",
        "On task",
        "Minor issues 2-3 a day",
        "Disruptive",
        "Motor/Verbal stimming",
        "Severe meltdown",
        "Elopement",
        "Property Destruction",
        "Self-Injurious Behavior"
    ]
}

// Sensory regulation info
const sensoryRegulationInfo = {
    name : "sensoryregulation",
    categories : [ 
        "High",
        "Moderate",
        "Low"
    ]
}

// Excerise info
const exerciseInfo = {
    name : "exercise",
    categories : [ 
        "High",
        "Moderate",
        "Low"
    ],
}

// Weather info
const weatherInfo= {
    name : "weather",
    categories : [ 
        "Sunny",
        "Cloudy",
        "Rain/Snow"
    ],
}

// LineCharts class
class LineCharts extends React.Component {

    constructor() {
        super();

        this.state = {
            child: "",
            title: "",
            showChart: false,
            dbNotes: [],
            year: 2019,
            chartName: "",
            chartInfo: "",
            chartData: []
        };
    }

    // componentDidMount method
    componentDidMount() {

        // Load local storage
        let apbSystem = JSON.parse(localStorage.getItem("apbSystem"));
        
        // Get current year
        this.setState({year: new Date().getFullYear()});
        this.setState({year: 2018});
        
        // Get chart name to display
        const values = queryString.parse(document.location.search);
        //console.log(values);
        if (values.chart == null) {
            this.setState({chartName: "Behavior", chartInfo: behaviorInfo});
        } else {
            axisConfig.xLabel = values.chart;
            switch (values.chart) {
                case "Mood" :
                    this.setState({chartName: values.chart, chartInfo: moodInfo});
                    break;
                case "Exercise" :
                    this.setState({chartName: values.chart, chartInfo: exerciseInfo});
                    break;
                case "Nutrition" :
                    this.setState({chartName: values.chart, chartInfo: nutritionInfo});
                    break;
                case "Sensory Regulation" :
                    this.setState({chartName: values.chart, chartInfo: sensoryRegulationInfo});          
                    break;
                case "Sleep" :
                    this.setState({chartName: values.chart, chartInfo: sleepInfo}); 
                    break;
                case "Weather" :
                    this.setState({chartName: values.chart, chartInfo: weatherInfo});
                    break;
                case "Behavior" :
                default:
                    this.setState({chartName: "Behavior", chartInfo: behaviorInfo});
                    break;
            } 
        }
    
        // Get Child notes
        API.getNotes(apbSystem.cid)
        .then(res =>  {         
            if (res.data.notes.length > 0) {
        
                // Set child
                this.setState({child: res.data.child});
                
                // Set notes
                this.setState({dbNotes: res.data.notes});
        
                // Show the chart
                this.setState({showChart: true});
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    // onChange handler for the chart dropdown list
    onChange = (event) => {
        document.location = "/linecharts?chart=" + event.target.value;
    }

    // Create chart data
    createChartData = (dbNotes, year, chartInfo) => {
        let chartData = [];        
      
        // Get notes by year
        let notesByYear = this.getNotesByYear(dbNotes, year);
    
        // Create chart line data for each category
        chartInfo.categories.forEach(category => {
            let lineValues = this.createChartLineData(notesByYear, chartInfo.name, category); 
            if (lineValues != null) {
                let lineData = { 
                    key: category,
                    values: lineValues
                }       
                chartData.push(lineData);
            }
        });
    
        // Return chart data
        return chartData;
    }

    // Create chart line data
    createChartLineData = (notes, name, category) => {

        let lineValues = [];
    
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        let numberOfMonths = (currentYear == this.state.year) ? currentMonth: 11;
        for (let i = 0; i <= numberOfMonths; i++) {
            lineValues.push({x: months[i], y: 0});
            notes.forEach(note => {
                var date = new Date(note.start);
                let noteMonth = date.getMonth();
                if (i === noteMonth) {
                    //console.log("note.mood=" + note.mood + " category=" + category + " i=" + i + " noteMonth=" + noteMonth);
                    if (Array.isArray(note[name])) {
                        note[name].forEach(value => {
                            if (value === category)
                            lineValues[noteMonth].y++;
                        });
                    } else if (note[name] === category)
                        lineValues[noteMonth].y++;
                }     
            });
           
        } 

        // Return line data
        return lineValues;
    }

    // Get all notes by specifed year
    getNotesByYear = (dbNotes, year) => {
        let notes = dbNotes.filter((note) => {
            var date = new Date(note.start);
            let noteYear = date.getFullYear();
            return (noteYear === year);
        });
        return notes;
    }
    
    render() {
        if (this.state.showChart) {

          // Set year on X-axis          
          axisConfig.xLabel = "Year - " + this.state.year;

          // Create chart title
          let title = this.state.child + "'s " + this.state.year + " " + this.state.chartName + " Chart";

          // Create chart data
          let chartData = this.createChartData(this.state.dbNotes, this.state.year, this.state.chartInfo);

          // Display chart data
          return (
            <React.Fragment>
              <div>
                <p style={styles.header}>{title}</p>
                <div className="line-chart">
                    <LineChart 
                        data={chartData}
                        showLegend={true}
                        width={600}
                        height={400}
                        axisConfig={axisConfig}
                        showGrid={true}
                        pointSize={4}
                        strokeWidth={1.5}
                        useColorScale={true}
                        colorScale={colorScale}
                        margin={margin}
                        noDataMessage={"Sorry, no chart data available for year " + this.state.year}
                        
                    />
                </div>
              </div>              
              <Formik>
                <div>
                  <Form>
                      <div style={styles.select}>
                        <label style={styles.label} htmlFor="charts">Select chart:</label>
                        <Field component="select" name="charts" onChange={this.onChange} defaultValue={this.state.chartName}>
                            <option value="Behavior">Behavior</option>
                            <option value="Mood">Mood</option>
                            <option value="Nutrition">Nutrition</option>
                            <option value="Sensory Regulation">Sensory Regulation</option>
                            <option value="Sleep">Sleep</option>
                            <option value="Exercise">Exercise</option>
                            <option value="Weather">Weather</option>
                        </Field> 
                      </div>
                  </Form>
                </div>
              </Formik>
            </React.Fragment>
          );
        } else {
          return (
              <div>
              </div>
          );          
        }
    }
}

// Export the LineCharts UI page
export default LineCharts;