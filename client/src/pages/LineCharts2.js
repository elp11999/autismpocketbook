// Import React library
import React from 'react';

// Import QueryString library
import queryString from 'query-string';

// Import React-chartjs-2 library
import { Line } from 'react-chartjs-2';

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

// Mood chart info
const moodInfo = {
    name : "mood",
    categories : [    
        {
            name: "Happy",
            color: "blue"
        },
        { 
            name: "Calm",
            color: "green"
        },
        {
            name: "Sad",
            color: "red"
        },
        {
            name: "Anxious",
            color: "purple"
        },
        {
            name: "Frustrated",
            color: "black"
        },
        {
            name: "Frustrated",
            color: "yellow"
        }
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
class LineCharts2 extends React.Component {

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
        this.setState({year: 2019});
        
        // Get chart name to display
        const values = queryString.parse(document.location.search);
        //console.log(values);
        if (values.chart == null) {
            this.setState({chartName: "Mood", chartInfo: moodInfo});
        } else {
            //axisConfig.xLabel = values.chart;
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
        document.location = "/linecharts2?chart=" + event.target.value;
    }

    // Create chart data
    createChartData = (dbNotes, year, chartInfo) => {
        
        const chartData = {
            labels: [],
            datasets: []
        };
      
        // Get notes by year
        let notesByYear = this.getNotesByYear(dbNotes, year);
    
        // Create chart line data for each category
        chartInfo.categories.forEach(category => {
            let dataset = this.createChartLineData(chartData, notesByYear, chartInfo.name, category); 
            if (dataset != null) {
                chartData.datasets.push(dataset);
            }
        });
    
        // Return chart data
        return chartData;
    }

    // Create chart line data
    createChartLineData = (chartData, notes, name, category) => {

        let dataset = {
          label: category.name,
          fill: false,
          lineTension: 0.1,
          backgroundColor: category.color,
          borderColor: category.color,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: category.color,
          pointBackgroundColor: "white",
          pointBorderWidth: 1,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: category.color,
          pointHoverBorderColor: category.color,
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 3,
          data: [],
          borderWidth: 2,
        };

        let haveLineData = false;    
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        let numberOfMonths = (currentYear === this.state.year) ? currentMonth: 11;
        for (let i = 0; i <= numberOfMonths; i++) {
            if (chartData.labels.length === 0 || chartData.labels.length < i+1)
                chartData.labels.push(months[i]);
            dataset.data.push(0);
            notes.forEach(note => {
                var date = new Date(note.start);
                let noteMonth = date.getMonth();
                if (i === noteMonth) {
                    //console.log("note.mood=" + note.mood + " category=" + category + " i=" + i + " noteMonth=" + noteMonth);
                    if (Array.isArray(note[name])) {
                        note[name].forEach(value => {
                            if (value === category.name)
                            dataset.data[noteMonth]++;
                        });
                    } else if (note[name] === category.name)
                    dataset.data[noteMonth]++;
                }
            });
            
            // Check for any line data
            if (dataset.data[i] > 0)
                haveLineData = true;
           
        } 

        // Return line data
        return (haveLineData === true) ?  dataset :  null;
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
                    <Line ref="chart"
                          data={chartData} 
                          width={600}
                          height={400}
                          options={{ maintainAspectRatio: false }}
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
export default LineCharts2;