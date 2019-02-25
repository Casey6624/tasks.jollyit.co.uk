import React from "react";
import classes from "./Ticket.css";
import { Button } from "react-bootstrap";

const ticket = (props) => {

    let priorityAppended;

    let { taskPriority,  taskAssignedTo, taskTitle, taskDescription, timeAssigned, handleTaskComplete, handleTaskDelete, handleEditTask} = props;

    switch(taskPriority){
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
        <div className={classes.Ticket} onClick={handleEditTask}>
            <h1><strong>{taskTitle}</strong></h1>
            <h4><strong>Priority </strong> | {priorityAppended}</h4>
            <h2>Time Assigned | {timeAssigned}</h2>
            <h3>Assigned To | <span className="badge badge-light">{taskAssignedTo}</span></h3>
            <h4><strong>Description </strong>| {taskDescription}</h4>
            <Button bsStyle="success" className={classes.taskButtons} onClick={handleTaskComplete} >Mark As Complete</Button>
            <Button bsStyle="danger" className={classes.taskButtons} onClick={handleTaskDelete} >Delete Task</Button>
        </div>
    )
}

export default ticket;