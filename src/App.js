// Libaries
import React, { useState } from 'react';
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

export default function App(props){

  const [loggedIn, setLoggedIn] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [logInError, setLoginError] = useState(false)

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleChange(event){
    let elementType = event.target.name
    let elementValue = event.target.value
    switch(elementType){
      case "username":
      setUsername(elementValue)
      break;
      case "password":
      setPassword(elementValue)
      break;
      default:
      break;
    }
  }

  function handleLogOut(){
      setLoggedIn(false)
  }

  function handleSubmit(event){
    event.preventDefault();
    let postURL = "https://tasks.jollyit.co.uk/php/handleAuth.php";
    axios.post(postURL, {
      username: username,
      password: password
    })
    .then(res => {
      if(res.data){
        setLoggedIn(true)
        setLoginError(false)
      }else{
        setLoginError(true)
      }
    })
  }
    // Show login page if loggedIn is false    
    if(!loggedIn){
      return(
        <div className={loginClasses.Login}>
        <h1 className={loginClasses.h1Title}>JOLLY IT | <span>TASKS </span></h1>
        <Robot className={loginClasses.Robot}/> 
          <form onSubmit={handleSubmit}>
            <FormGroup controlId="username" bsSize="large">
              <FormControl
                autoFocus
                type="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <FormControl
                value={password}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                type="password"
              />
            </FormGroup>
            <Button
              className={loginClasses.submitBtn}
              block
              bsSize="large"
              type="submit"
              onClick={handleSubmit}
            >
              LOGIN
            </Button>
          </form>
          {/* Dynamicly render the error message */}
          {logInError ? <div className={loginClasses.errors} show={logInError ? true : false}>
          <div className="alert alert-danger">
          <strong>Warning</strong> Invalid Login Details, Please Try Again.
          </div>
          </div> : null}
          </div>
      )
    }

    return (
      <div className={classes.App}>
      <MainNav LogOut={ handleLogOut}/>
      <NewTaskForm/>
      <MainBody/>
      </div>
    );
  
}
