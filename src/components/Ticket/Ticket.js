import React from "react";
import classes from "./Ticket.css";
import { Button } from "react-bootstrap";

const ticket = (props) => {

    return(
        <div className={classes.Ticket}>
            <h1><strong>{props.taskTitle}</strong></h1>
            <h2>Time Assigned | {props.timeAssigned}</h2>
            <h3>Assigned To | {props.taskAssignedTo}</h3>
            <h4><strong>Description </strong>| {props.taskDescription}</h4>
            <Button bsStyle="success" className={classes.taskButtons} onClick={props.handleTaskComplete} >Mark As Complete</Button>
            <Button bsStyle="danger" className={classes.taskButtons} onClick={props.handleTaskDelete} >Delete Task</Button>
        </div>
    )
}

export default ticket;