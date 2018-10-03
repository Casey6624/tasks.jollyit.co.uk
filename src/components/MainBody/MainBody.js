// Libaries
import React, { Component } from "react";
// CSS
import classes from "./MainBody.css";
// Components
import TicketList from "../../components/TicketList/TicketList";
//import Loading from "../SVGSpinner/Loading";

class MainBody extends Component {

    render () {

        return (
          <div className={classes.MainBody}>
            <TicketList />
          </div>
        );
    }
}
export default MainBody;
