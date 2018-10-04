// Libraries
import React, {Component} from 'react';
import axios from "axios";
// CSS 
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import classes from "./LoginPage.css";
// Components
import Robot from "../../assets/robot/robot";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loggedIn: false
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    let postURL = "https://tasks.jollyit.co.uk/php/handleAuth.php";

    let loginUser = this.refs.loginUser.value;
    let loginPass = this.refs.loginPass.value;
    this.setState({
      username: loginUser,
      password: loginPass
    }, () => axios.post(postURL, {
      username: this.state.username,
      password: this.state.password
    })
    .then(res => {
      console.log(res);
    })
    .catch(function (error) {
      console.log(error);
    }))
  }

  render() {
    return (
      <div className={classes.Login}>
      <h1>JOLLY IT | <span>TASKS </span></h1>
      <Robot className={classes.Robot}/> 
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
              ref="loginUser"
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              ref="loginPass"
            />
          </FormGroup>
          <Button
            className={classes.submitBtn}
            block
            bsSize="large"
            type="submit"
            onClick={this.handleSubmit}
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
export default LoginPage;