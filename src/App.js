import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Post from './Post';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/">
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
            <h1 className="App-title">Welcome to React</h1>
            <Link to="/Home">Home</Link>|<Link to="/Post">Post</Link>
          </header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/post/" component={Post} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
