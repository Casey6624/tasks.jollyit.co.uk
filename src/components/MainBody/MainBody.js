// Libaries
import React, { Component } from "react";
// CSS
import classes from "./MainBody.css";
// Components
import TicketList from "../../components/TicketList/TicketList";
//import Loading from "../SVGSpinner/Loading";

class MainBody extends Component {
    state = {

    }

    render () {
        /* 
        SVG spinner displayed whenwe are loading data from server.
        add an IF Statement to check state once backend finished.

        return(
            <Loading />
        ) */

        return (
          <div className={classes.MainBody}>
            <TicketList></TicketList>
          </div>
        );
    }
}
export default MainBody;
