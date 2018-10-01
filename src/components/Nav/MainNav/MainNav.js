import React from "react";
import classes from "./MainNav.css";

const mainnav = (props) => {
   return(
        <div className={classes.Nav}>
        <ul>
            <li>Jolly IT Tasks</li>
            <li><a href="/">Log Out</a></li>
        </ul>
        </div>
    )
}

export default mainnav;