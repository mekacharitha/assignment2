import React, { Component } from 'react';
import './App.css';
import Signup from './components/signup/Signup';
//import { Switch, Route, Redirect } from 'react-router-dom';
//import Board from './components/Boards/Board';
import Stage from './components/Boards/Stage/Stage'
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
   // let name = JSON.parse(localStorage.getItem("signedInUser"))
    return (
      <div className="App">
        <div className="Header"></div>

        {/* {this.state.isLoggedIn ?
          <Switch>
            <Redirect to="/boards"></Redirect>
            <Route path="/boards"> <div>Boards</div> </Route>
          </Switch>
          :
          <Route path="/" exact><Signup handleSignIn={this.handleSignIn}/></Route>
        } */}

        <Signup />
        {/* <Stage /> */}

      </div>
    );
  }
}

export default App;
