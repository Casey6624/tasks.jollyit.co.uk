import React from "react";
import classes from "./TicketStats.css";

const TicketStats= (props) => {
    return(
        <div bsStyle="container" className={classes.main}>
            <h1>TASK INFO</h1>
            <h3>Current Available Tasks: <span className="badge badge-light">{props.outstandingTickets}</span></h3>
            <h3>Total Complete Tasks: <span className="badge badge-light">0</span></h3>
        </div>
    )
}

export default TicketStats;