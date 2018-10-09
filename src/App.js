// Libaries
import React, { Component } from 'react';
import axios from "axios";
// CSS
import classes from "./App.css";
import { Button, FormGroup, FormControl} from "react-bootstrap";
import loginClasses from "./components/LoginPage/LoginPage.css";
// Components
import MainBody from "./components/MainBody/MainBody";
import MainNav from "./components/Nav/MainNav/MainNav";
import NewTaskForm from "./components/NewTask/NewTaskForm/NewTaskForm";
import Robot from "./assets/robot/robot";
//import Loading from "./components/SVGSpinner/Loading";

class App extends Component {

  state = {
    loggedIn: false,
    username: null,
    password: null,
    logInError: false
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleLogOut = () => {
    this.setState({
      loggedIn: false
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    let postURL = "https://tasks.jollyit.co.uk/php/handleAuth.php";
    axios.post(postURL, {
      username: this.state.username,
      password: this.state.password
    })
    .then(res => {
      if(res.data){
        this.setState({
          logInError: false,
          loggedIn: true
        })
      }else{
        this.setState({
          logInError: true
        })
      }
    })
  }

  render() {

    // Show login page if loggedIn is false    
    if(!this.state.loggedIn){
      return(
        <div className={loginClasses.Login}>
        <h1 className={loginClasses.h1Title}>JOLLY IT | <span>TASKS </span></h1>
        <Robot className={loginClasses.Robot}/> 
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="username" bsSize="large">
              <FormControl
                autoFocus
                type="username"
                placeholder="Username"
                value={this.username}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <FormControl
                value={this.password}
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <Button
              className={loginClasses.submitBtn}
              block
              bsSize="large"
              type="submit"
              onClick={this.handleSubmit}
            >
              LOGIN
            </Button>
          </form>
          {/* Dynamicly render the error message */}
          {this.state.logInError ? <div className={loginClasses.errors} show={this.state.logInError ? true : false}>
          <div className="alert alert-danger">
          <strong>Warning</strong> Invalid Login Details, Please Try Again.
          </div>
          </div> : null}
          </div>
      )
    }

    return (
      <div className={classes.App}>
      <MainNav LogOut={ this.handleLogOut}/>
      <NewTaskForm/>
      <MainBody/>
      </div>
    );
  }
}

export default App;
