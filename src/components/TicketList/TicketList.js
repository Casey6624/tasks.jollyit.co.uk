import React, { Component } from "react";
import Ticket from "../Ticket/Ticket";
import classes from "./TicketList.css";

class TicketList extends Component{

    deleteTask = (taskKey, taskTitle) => {
        console.log("This worked!");
    }

    handleTaskDeleter(){
        console.log("this is working!!");
    }

    state = {tickets: [
        {taskTitle: "EUROSERVER REBOOT",
        taskAssignedTo: "Casey",
        timeAssigned: "10:17am",
        taskDescription: "We need to reboot the server at 8pm"},
        {taskTitle: "Purchase Exchange Plan 1 License",
        taskAssignedTo: "Tony",
        timeAssigned: "11:35am",
        taskDescription: "For PLMR"}
    ]}
    render(){
    return(
        <div className={classes.ticketList}>
            {this.state.tickets.map((tasks, index) => <Ticket handleTaskDelete={this.handleTaskDeleter} key={this.state.tickets[index].taskTitle} taskTitle={this.state.tickets[index].taskTitle} taskAssignedTo={this.state.tickets[index].taskAssignedTo} timeAssigned={this.state.tickets[index].timeAssigned} taskDescription={this.state.tickets[index].taskDescription}></Ticket>)}
        </div>
    )
    }
}

export default TicketList;