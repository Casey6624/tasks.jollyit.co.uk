import React, { useState, useEffect } from "react";
import classes from "./EditTask.css";
import { Button } from "react-bootstrap";

export default function EditTask(props){
    if(!props){
        return null
    }

    const [taskTitle, setTaskTitle] = useState(props.selectedEditTask.taskTitle)
    const [taskDescription, setTaskDescription] = useState(props.selectedEditTask.taskDescription)
    const [taskAssignedTo, setTaskAssignedTo] = useState(props.selectedEditTask.taskAssignedTo)
    const [priority, setPriority] = useState(props.selectedEditTask.priority)


    // if selectedEditTask prop changes, rerender the form with the new data
    useEffect(() => {
        setTaskTitle(props.selectedEditTask.taskTitle)
        setTaskDescription(props.selectedEditTask.taskDescription)
        setTaskAssignedTo(props.selectedEditTask.taskAssignedTo)
        setPriority(props.selectedEditTask.priority)
    }, [props.selectedEditTask])

    return(
        <div className={classes.main}>
            <h1 className={classes.statTitle}>EDIT TASK</h1>
            <hr className={classes.orangeDivider} />

            <h4>Title: <input type="text" value={taskTitle}/></h4>
            <h4>Assigned To: 
            <select className={classes.add__name}>
                      <option value="-" disabled="disabled" id="personInput" defaultValue required={true}>Name</option>
                        <option value="Anyone">Anyone</option>
                        <option value="Ben">Ben</option>
                        <option value="Casey">Casey</option>
                        <option value="Lewis">Lewis</option>
                        <option value="Jude">Jude</option>
                        <option value="Tony">Tony</option>
                        <option value="Tom">Tom</option>
            </select>
            </h4>
            <h4>
                Priority:
                <select className={classes.add__name} defaultValue={1} required={true}>
                      <option value="-" disabled="disabled" id="priorityInput">Priority</option>
                        <option value="1">1 (Highest)</option>
                        <option value="2">2 (High)</option>
                        <option value="3">3 (Medium)</option>
                        <option value="4">4 (Low)</option>
                        <option value="5">5 (Low/When Convinent)</option>
                    </select>
            </h4>
            <h4>Description: <input type="text" value={taskDescription}/></h4>
            <Button bsStyle="success">SAVE</Button>
        </div>
    )
}
