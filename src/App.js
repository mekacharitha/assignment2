import React, { Component } from 'react';
import './App.css';
import Signup from './components/signup/Signup';
import { Switch, Route } from 'react-router-dom';
import Board from './components/Boards/Board';

class App extends Component {
  state = {
    isLoggedIn: false,
  }

  handleSignIn = ()=>{
    this.setState({
      isLoggedIn:true,
    })
  }
  render() {
    return (
      <div className="App">
        <div className="Header"></div>

        {this.state.isLoggedIn ?
          <Switch>
            <Route path="/boards"><Board /></Route>
          </Switch>
          :
          <Route path="/"><Signup handleSignIn={this.handleSignIn}/></Route>
        }

      </div>
    );
  }
}

export default App;
