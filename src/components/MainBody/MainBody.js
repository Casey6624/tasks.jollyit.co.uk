import React, { Component } from "react";
import classes from "./MainBody.css";
import Ticket from "../../components/Ticket/Ticket";

class MainBody extends Component {
    state = {
        tickets: [
            {taskTitle: "EUROSERVER REBOOT",
            taskAssignedTo: "Casey",
            timeAssigned: "10:17am",
            taskDescription: "We need to reboot the server at 8pm"},
            {taskTitle: "Purchase Exchange Plan 1 License",
            taskAssignedTo: "Tony",
            timeAssigned: "11:35am",
            taskDescription: "For PLMR"}
        ]
    }
    render () {
        // Check if we have any outsanding tasks
        if(this.state.tickets[0].taskTitle === ""){
            return(
                <div className={classes.noTasks} >NO <span>TASKS</span> CURRENTLY ASSIGNED
                <p>Boom! We're on top of stuff.</p>
                </div>
            )
        }
        return (
          <div className={classes.MainBody}>
            <Ticket
            key={this.state.tickets.taskTitle} 
            taskTitle={this.state.tickets.taskTitle}
            taskAssignedTo={this.state.tickets.taskAssignedTo}
            timeAssigned={this.state.tickets.timeAssigned}
            taskDescription={this.state.tickets.taskDescription}
            ></Ticket>
          </div>
        );
    }
}
export default MainBody;