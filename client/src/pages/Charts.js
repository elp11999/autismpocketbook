import React, {Component} from 'react';
import Pie from 'react-chartjs-2';
// Import the Formik library
//import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Formik, Form, Field } from 'formik';
//import pattern from 'patternomaly';

// Import the API library
import API from "../utils/API";

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

const moodData = {
  name: "Mood",
  values: [
    { title: 'Happy',      count: 0  },
    { title: 'Calm',       count: 0  },
    { title: 'Sad',        count: 0  },
    { title: 'Frustrated', count: 0  }
  ],
  labels: ["Happy", "Calm", "Sad", "Frustrated"],
  colors: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
  percentages: [0, 0, 0, 0]
};

const sleepData = {
  name: "Sleep",
  values: [
    { title: 'Woke up',                count: 0  },
    { title: 'Well Rested',            count: 0  },
    { title: 'Woke up several times',  count: 0  }
  ],
  labels: ["Woke up", "Well rested", "Woke up several times"],
  colors: ['#ff6384', '#36a2eb', '#cc65fe'],
  percentages: [0, 0, 0, 0]
};

const nutritionData = {
  name: "Nutrition",
  values: [
    { title: 'Full Meals/Balanced Diet', count: 0  },
    { title: 'Skipped Meals',            count: 0  }
  ],
  labels: ["Full Meals/Balanced Diet", "Skipped Meals"],
  colors: ['#ff6384', '#36a2eb'],
  percentages: [0, 0]
};

const exerciseData = {
  name: "Exercise",
  values: [
    { title: 'Low',       count: 0  },
    { title: 'Moderate',  count: 0  },
    { title: 'High',      count: 0  }
  ],
  labels: ["Low", "Moderate", "High"],
  colors: ['#ff6384', '#36a2eb', '#cc65fe'],
  percentages: [0, 0, 0]
};

const sensoryData = {
  name: "Sensory Regulation",
  values: [
    { title: 'Low',       count: 0  },
    { title: 'Moderate',  count: 0  },
    { title: 'High',      count: 0  }
  ],
  labels: ["Low", "Moderate", "High"],
  colors: ['#ff6384', '#36a2eb', '#cc65fe'],
  percentages: [0, 0, 0]
};

const behaviorData = {
  name: "Behavior",
  values: [
    { title: 'No issues',                count: 0  },
    { title: 'On task',                  count: 0  },
    { title: 'Minor issues 2-3 a day',   count: 0  },
    { title: 'Disruptive',               count: 0  },
    { title: 'Motor/Verbal stimming',    count: 0  },
    { title: 'Severe meltdown',          count: 0  },
    { title: 'Elopement',                count: 0  },
    { title: 'Property Destruction',     count: 0  },
    { title: 'Self-Injurious Behavior',  count: 0  }
  ],
  labels: ["No issues", 
           "On task", 
           "Minor issues 2-3 a day", 
           "Disruptive", 
           "Motor/Verbal stimming", 
           "Severe meltdown",
           "Elopement",
           "Property Destruction",
           "Self-Injurious Behavior"
  ],
  colors: ['red', 
           'pink',
           'blue',
           'brown', 
           'teal',
           'khaki',
           'gray',
           'orange',
           'yellow'
  ],
  percentages: [0, 0, 0, 0, 0, 0, 0, 0, 0]
};

let chartData = {
  labels: [],
  datasets: [
    {
      backgroundColor: [],
      data: []
    }
  ]
};

export default class chart extends Component {

    state = {
        child: "",
        title: "",
        showChart: false,
        data: []
    };
    
    setChartData = (data, index, target) => {
      target.values.forEach((value) => {
        value.count = 0;
        value.percentage = 0;
      });
      console.log(target);
      data.forEach((childData) => {
        let searchValue = childData[index].value;
        target.values.forEach((value, index) => {
          //console.log("searchValue=" + searchValue + "  value="  + value.title);
          if (value.title === searchValue) {
            value.count++;
            target.percentages[index] = (value.count * 100 / data.length)
          }
        });
      });
      
      this.setState({title: this.state.child + "'s " + target.name + " Chart"});
      chartData.labels = target.labels;
      chartData.datasets[0].backgroundColor = target.colors;
      chartData.datasets[0].data = target.percentages;
    }

    componentDidMount() {
        //const { datasets } = this.refs.chart.chartInstance.data;

        // Load local storage
        let apbSystem = JSON.parse(localStorage.getItem("apbSystem")); 
    
        // Get Child notes
        API.getNotes(apbSystem.cid)
        .then(res =>  {          
            if (res.data.notes.length > 0) {
              let childData = [];
              res.data.notes.sort((a, b) => (a.start < b.start) ? 1 : -1);
              res.data.notes.forEach((note) => {
                childData.push([
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
                this.setState({data: childData});
              });              
        
              // Set child's name   
              this.setState({child: res.data.child}); 
              this.setChartData(this.state.data, 1, behaviorData);
              this.setState({showChart: true});
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    onClick = (event) => {
      switch (event.target.value) {
        case "Behavior" :
          this.setChartData(this.state.data, 1, behaviorData);
          break;
        case "Exercise" :
          this.setChartData(this.state.data, 2, exerciseData);
          break;
        case "Mood" :
          this.setChartData(this.state.data, 3, moodData);
          break;
        case "Nutrition" :
          this.setChartData(this.state.data, 4, nutritionData);
          break;
        case "Sensory Regulation" :          
          this.setChartData(this.state.data, 5, sensoryData);
          break;
        case "Sleep" :
          this.setChartData(this.state.data, 6, sleepData);
          break;
        default:
          this.setChartData(this.state.data, 3, moodData);
          break;
      }
    }
    
    render() {
        if (this.state.showChart) {
          return (
            <React.Fragment>
              <div>
                <p style={styles.header}>{this.state.title}</p>
                <Pie ref="chart" data={chartData} />
              </div>              
              <Formik>
                <div>
                  <Form>
                      <div style={styles.select}>
                        <label style={styles.label} htmlFor="charts">Select chart:</label>
                        <Field component="select" name="charts" onClick={this.onClick}>
                            <option value="Behavior">Behavior</option>
                            <option value="Mood">Mood</option>
                            <option value="Sleep">Sleep</option>
                            <option value="Nutrition">Nutrition</option>
                            <option value="Exercise">Exercise</option>
                            <option value="Sensory Regulation">Sensory Regulation</option>
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