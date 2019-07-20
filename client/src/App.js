import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from './components/Navbar/';
import Footer from './components/Footer/';
import Home from './pages/Home';
//import Usage from './pages/Usage';
import Resources from './pages/Resources';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddChild from './pages/AddChild';
import NoMatch from "./pages/NoMatch";
import DashBoard from './pages/DashBoard';
//import Charts from './pages/Charts';
//import LineCharts from './pages/LineCharts';
import LineCharts2 from './pages/LineCharts2';
import ForumFolders from './components/ForumFolders';
import ForumTopics from './components/ForumTopics';
import ForumPosts from './components/ForumPosts';
import API from "./utils/API";
import './App.css';

// Create local storage
if (!localStorage.getItem("apbSystem"))
  localStorage.setItem("apbSystem", JSON.stringify({ pid: "", cid: "", user: "" }));

class PrivateRoute extends React.Component {
  state = {
    isAuthenticated: null
  }

  componentDidMount() {

    // Authenticate
    API.authenticate().then(() => {
      this.setState({isAuthenticated : true});
    }).catch(() => {
      this.setState({isAuthenticated : false});
    })
  }

  render() {
    const { isAuthenticated } = this.state;
    //console.log("isAuthenticated=" + isAuthenticated)

    return isAuthenticated === null ? 
      <div>Loading...</div> : 
      isAuthenticated === true ? 
        <Route {...this.props} /> : 
        <Redirect to="/login" />;
  }
}

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/resources" component={Resources} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/dashboard" component={DashBoard} />
          <PrivateRoute exact path="/addc" component={AddChild} />
          <PrivateRoute exact path="/linecharts2" component={LineCharts2} />
          <Route exact path="/forum" component={ForumFolders} />
          <Route exact path="/forum/topic" component={ForumTopics} />
          <Route exact path="/forum/listposts" component={ForumPosts} />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
    </div>
    </Router>
  );
}

export default App;
