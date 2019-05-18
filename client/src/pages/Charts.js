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
      fontSize: "1.5rem",
      textAlign: "center",
      alignContent : "center"
    },
    label: {
        fontSize: "2rem",
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
  percentages : [0, 0, 0, 0]
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
  percentages: [0, 0, 0]
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

let chartData = {
  labels: [],
  datasets: [
    {
      backgroundColor: [],
      data: [0, 0, 0, 0]
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
      console.log("New way!!!");
      target.values.forEach((value) => {
        value.count = 0;
        value.percentage = 0;
      });
      data.forEach((childData) => {
        let searchValue = childData[index].value;
        target.values.forEach((value, index) => {
          console.log("searchValue=" + searchValue + " nutritions="  + value.title);
          if (value.title === searchValue) {
            value.count++;
            target.percentages[index] = (value.count * 100 / data.length)
          }
        });
      });
      
      this.setState({title: this.state.child + "'s " + target.name + " Chart"});
      chartData.labels = target.labels;
      chartData.datasets[0].backgroundColor = target.colors;
      chartData.datasets[0].data =  target.percentages;
      console.log(chartData);
    }

    componentDidMount() {
        //const { datasets } = this.refs.chart.chartInstance.data;

        // Load local storage
        let apbSystem = JSON.parse(localStorage.getItem("apbSystem")); 
        
        // Set child's name   
        this.setState({child: apbSystem.child}); 
    
        // Get Child notes
        API.getNotes(apbSystem.child)
        .then(res =>  {          
            if (res.data.length > 0) {
              let childData = [];
              res.data.sort((a, b) => (a.start < b.start) ? 1 : -1);
              res.data.forEach((note) => {
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
              this.setChartData(childData, 3, moodData);
              this.setState({showChart: true});
              console.log(childData);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    onClick = (event) => {
      console.log("onClick: entered!!");
      switch (event.target.value) {
        case "Mood" :
          this.setChartData(this.state.data, 3, moodData);
          break;
        case "Sleep" :
          this.setChartData(this.state.data, 6, sleepData);
          break;
        case "Nutrition" :
          this.setChartData(this.state.data, 4, nutritionData);
          break;
        default:
          this.setChartData(this.state.data, 3, moodData);
          break;
      }
      console.log(event.target.value);
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
                            <option value="Mood">Mood</option>
                            <option value="Sleep">Sleep</option>
                            <option value="Nutrition">Nutrition</option>
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