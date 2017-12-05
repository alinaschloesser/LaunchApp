import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Favorites from './Favorites';


class App extends Component {
  
  render() {
    return (
      <Router>
        <div>
          <Route exact path= "/" component={Main} />
          <Route path = "/favs" component={Favorites}/>
        </div>
      </Router>
    )
  }

}

export default App;
