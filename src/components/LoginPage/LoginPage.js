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

/*   handleSubmit = async e => {
    e.preventDefault();
    const postURL = "https://tasks.jollyit.co.uk/php/handleAuth.php";
    const { username, password } = this.state;
    try {
      const result = await axios.post(postURL, {
        username,
        password
      });
      const response = await Boolean(result);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  } */

  handleSubmit = event => {
    event.preventDefault();
    let postURL = "https://tasks.jollyit.co.uk/php/handleAuth.php";
    axios.post(postURL, {
      username: this.state.username,
      password: this.state.password
    })
    .then(res => {
      console.log(res);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
    return (
      <div className={classes.Login}>
      <h1>JOLLY IT | <span>TASKS </span></h1>
      <Robot className={classes.Robot}/> 
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <FormControl
              autoFocus
              type="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
              ref="loginUser"
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormControl
              value={this.state.password}
              placeholder="Password"
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