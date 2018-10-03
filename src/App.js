import React, { Component } from 'react';
import classes from "./App.css";
import MainBody from "./components/MainBody/MainBody";
import MainNav from "./components/Nav/MainNav/MainNav";
import NewTaskForm from "./components/NewTask/NewTaskForm/NewTaskForm";
import LoginPage from "./components/LoginPage/LoginPage";

class App extends Component {

  state = {
    loggedIn: false
  }

  render() {

    // uncomment when the login page is completed 
/*     if(!this.state.loggedIn){
      return(
        <div>
        <LoginPage /> 
        </div> 
      )
    } */


    return (
      <div className={classes.App}>
      <MainNav/>
      <NewTaskForm/>
      <MainBody/>
      </div>
    );
  }
}

export default App;
