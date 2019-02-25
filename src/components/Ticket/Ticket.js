import React from "react";
import classes from "./Ticket.css";
import { Button } from "react-bootstrap";

const ticket = (props) => {

    let priorityAppended;

    switch(props.taskPriority){
        case "1":
        priorityAppended = "1 (Highest Priority)"
        break;

        case "2":
        priorityAppended = "2 (High Priority)"
        break;

        case "3":
        priorityAppended = "3 (Medium Priority)"
        break;

        case "4":
        priorityAppended = "4 (Low Priority)"
        break;

        case "5":
        priorityAppended = "5 (Low/When Convinent Priority)"
        break;
        default:
        break;
    }


    return(
        <div className={classes.Ticket}>
            <h1><strong>{props.taskTitle}</strong></h1>
            <h4><strong>Priority </strong> | {priorityAppended}</h4>
            <h2>Time Assigned | {props.timeAssigned}</h2>
            <h3>Assigned To | <span className="badge badge-light">{props.taskAssignedTo}</span></h3>
            <h4><strong>Description </strong>| {props.taskDescription}</h4>
            <Button bsStyle="success" className={classes.taskButtons} onClick={props.handleTaskComplete} >Mark As Complete</Button>
            <Button bsStyle="danger" className={classes.taskButtons} onClick={props.handleTaskDelete} >Delete Task</Button>
        </div>
    )
}

export default ticket;