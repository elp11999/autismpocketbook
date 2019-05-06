import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar/';
import Footer from './components/Footer/';
import Home from './pages/Home';
import Usage from './pages/Usage';
import Reports from './pages/Reports';
import Resources from './pages/Resources';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddChild from './pages/AddChild';
import NoMatch from "./pages/NoMatch";
import './App.css';

function App() {

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/usage" component={Usage} />
          <Route exact path="/reports" component={Reports} />
          <Route exact path="/resources" component={Resources} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/addc" component={AddChild} />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
    </div>
    </Router>
  );
}

export default App;
