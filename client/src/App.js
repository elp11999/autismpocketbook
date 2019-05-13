import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from './components/Navbar/';
import Footer from './components/Footer/';
import Home from './pages/Home';
import Usage from './pages/Usage';
import Resources from './pages/Resources';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddChild from './pages/AddChild';
import NoMatch from "./pages/NoMatch";
import DashBoard from './pages/DashBoard';
import './App.css';
import API from "./utils/API";

class PrivateRoute extends React.Component {
  state = {
    isAuthenticated: null
  }

  componentDidMount() {
    API.authenticate().then(() => {
      this.setState({isAuthenticated : true});
    }).catch(() => {
      this.setState({isAuthenticated : false});
    })
  }

  render() {
    const { isAuthenticated } = this.state;
    console.log("isAuthenticated=" + isAuthenticated)

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
          <Route exact path="/usage" component={Usage} />
          <Route exact path="/resources" component={Resources} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/dashboard" component={DashBoard} />
          <PrivateRoute exact path="/addc" component={AddChild} />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
    </div>
    </Router>
  );
}

export default App;
