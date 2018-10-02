//Libaries
import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
//Components
import Ticket from "../Ticket/Ticket";
import classes from "./TicketList.css";
import ModalDelete from "../Modals/ModalDelete/ModalDelete";
import ModalComplete from "../Modals/ModalComplete/ModalComplete";
import TicketStats from "../TicketStats/TicketStats";
//import Loading from "../SVGSpinner/Loading";
//Assets
import Robot from "../../assets/robot/robot"; 

class TicketList extends Component{
// ------------------------------------------------------------------
// -------------------------APP STATE--------------------------------
// ------------------------------------------------------------------
    state = {
        tickets: [
         // example task 1   
        {taskTitle: "EUROSERVER REBOOT",
        taskAssignedTo: "Casey",
        timeAssigned: "10:17am",
        taskDescription: "We need to reboot the server at 8pm"},
        // example task 2
        {taskTitle: "Purchase Exchange Plan 1 License",
        taskAssignedTo: "Tony",
        timeAssigned: "11:35am",
        taskDescription: "For PLMR"}
    ],
    // title of del task, passed to the modal
    taskDelTitle: "",
    // key of the del task
    taskDelKey: null,
    // title of complete task, passed to the modal
    taskCompleteTitle: "",
    // key of the complete task
    taskCompleteKey: null,
    // status of the del modal, false = not displayed
    showModalDelete: false,
    // status of the complete modal, false = not displayed
    showModalComplete: false
    }
//------------------------END OF APP STATE-------------------------
//-----------------------------------------------------------------

    // removes the task from state at it's current index
    handleRemoveTask = (index) => {
        let tickets = [...this.state.tickets];
        // slice ticket array at index
        tickets.splice(this.state.taskDelKey, 1);
        
        this.setState({tickets}, () => {
            // call the close modal function
            this.handleCloseDeleteModal();
        });
    }

    handleCompleteTask = (index) => {
        let tickets = [...this.state.tickets];
        // slice ticket array at index
        tickets.splice(this.state.taskDelKey, 1);
        
        this.setState({tickets}, () => {
            // call the close modal function
            this.handleCloseCompleteModal();
        });
        // Need to add insert into DB completed table function
    }

    // Shows the delete modal
    handleShowDeleteModal = (index,title) =>{
        this.setState({
            taskDelKey: index,
            taskDelTitle: title,
            showModalDelete: true
        })
    }

    // Shows the delete modal
    handleShowCompleteModal = (index,title) =>{
        this.setState({
            taskCompleteKey: index,
            taskCompleteTitle: title,
            showModalComplete: true
        })
    }

    // closes the delete Modal
    handleCloseDeleteModal = () =>{
        this.setState({
            showModalDelete: false
        })
    }

    // closes the complete Modal
    handleCloseCompleteModal = () =>{
        this.setState({
            showModalComplete: false
        });
    }

    // The axios HTTP request to the PHP server
    callDB = () =>{
        axios.get("https://tasks.jollyit.co.uk/php/getTasks.php")
        .then(res => {
            this.setState({
                tickets: res.data
            })
        })
        
    }


    render(){
        // lodash throttle to witheld the requests to 15 second intervals 
        const getDBData = _.debounce(() => {this.callDB()}, 15000);
        getDBData();

        if(this.state.tickets.length === 0){
            return(
                <div className={classes.noTasks}>
                <p>BOOM! We're killing it.</p>
                NO <span>TASKS</span> CURRENTLY ASSIGNED
                    <Robot/>
                </div>
                )
            }
    return(
        <div>
        <ModalDelete 
        show={this.state.showModalDelete} 
        // Hide Modal
        onHide={this.handleCloseDeleteModal} 
        removeTaskFromState={this.handleRemoveTask} 
        // Displays the task title in the modal
        taskToDel={this.state.taskDelTitle}
        />
        <ModalComplete 
        show={this.state.showModalComplete}
        onHide={this.handleCloseCompleteModal}
        completeTaskFromState={this.handleCompleteTask} 
        taskToComplete={this.state.taskCompleteTitle} 
        />
        <div bsStyle="container" className={classes.ticketList}>
        <TicketStats 
            bsStyle="col-4"
            outstandingTickets={this.state.tickets.length} 
        />
            {this.state.tickets.map((tasks, index) => <Ticket
            // CSS
            bsStyle="col-4"
            // Handlers
            // pop up del modal 
            handleTaskDelete={() => this.handleShowDeleteModal(index, this.state.tickets[index].taskTitle)} 
            // remove task from state
            handleTaskRemover={() => this.handleTaskRemove(index)} 
            // pop up complete modal
            handleTaskComplete={() => this.handleShowCompleteModal(index, this.state.tickets[index].taskTitle)}
            // remove completed task from state
            handleTaskCompleter={() => this.handleTaskComplete(index)}
            // Task attributes
            key={this.state.tickets[index].taskTitle} 
            taskTitle={this.state.tickets[index].taskTitle} 
            taskAssignedTo={this.state.tickets[index].taskAssignedTo} 
            timeAssigned={this.state.tickets[index].timeAssigned} 
            taskDescription={this.state.tickets[index].taskDescription}>
            </Ticket>)}
        </div>
        </div>
    )
    }
}

export default TicketList;