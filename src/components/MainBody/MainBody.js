// Libaries
import React, { Component } from "react";
// CSS
import classes from "./MainBody.css";
// Components
import TicketList from "../../components/TicketList/TicketList";
import Loading from "../SVGSpinner/Loading";

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
        /* 
        SVG spinner displayed whenwe are loading data from server.
        add an IF Statement to check state once backend finished.

        return(
            <Loading></Loading>
        ) */
        // Check if we have any outsanding tasks. Might have to change this to check for empty Array
        if(this.state.tickets[0].taskTitle === ""){
            return(
                <div className={classes.noTasks} >NO <span>TASKS</span> CURRENTLY ASSIGNED
                <p>Boom! We're on top of stuff.</p>
                </div>
            )
        }
        return (
          <div className={classes.MainBody}>
            <TicketList></TicketList>
          </div>
        );
    }
}
export default MainBody;