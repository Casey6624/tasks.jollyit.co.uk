import React from "react";
import classes from "./TicketStats.css";

const TicketStats= (props) => {
    return(
        <div className={classes.main}>
            <h1 className={classes.statTitle}>TASK STATS</h1>

            <hr className={classes.orangeDivider} />
           <h2 className={classes.companyWide}>Company Wide</h2><hr className={classes.whiteDivider}></hr>
            <h3>Total Complete Tasks: <span className="badge badge-light">{props.completedTaskCount}</span></h3>
            <h3>Currently Outstanding Today: <span className="badge badge-light">{props.outstandingTickets}</span></h3>
        </div>
    )
}

export default TicketStats;