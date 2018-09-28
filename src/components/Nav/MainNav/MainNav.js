import React from "react";
import classes from "./MainNav.css";

const mainnav = (props) => {
   return(
        <div className={classes.Nav}>
        <ul>
            <li><a href="/">Tasks</a></li>
            <li><a href="/">Log Out</a></li>
        </ul>
        </div>
    )
}

export default mainnav;