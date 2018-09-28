import React, { Component } from 'react';
import classes from "./App.css";
import MainBody from "./components/MainBody/MainBody";
import MainNav from "./components/Nav/MainNav/MainNav";
import NewTaskForm from "./components/NewTask/NewTaskForm/NewTaskForm";


class App extends Component {
  render() {
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
