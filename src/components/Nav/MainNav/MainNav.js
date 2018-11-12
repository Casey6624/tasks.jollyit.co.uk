import React from "react";
import classes from "./MainNav.css";

const mainnav = (props) => {
   return(
        <div className={classes.Nav}>
        <ul>
            <li className={classes.jollyIT}>Jolly IT Tasks</li>
            <li className={classes.logOut}><a href="" onClick={props.LogOut}>Log Out</a></li>
        </ul>
        </div>
    )
}

export default mainnav;