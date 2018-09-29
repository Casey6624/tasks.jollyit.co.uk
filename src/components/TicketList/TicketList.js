//Libaries
import React, { Component } from "react";
//Components
import Ticket from "../Ticket/Ticket";
import classes from "./TicketList.css";
import ModalDelete from "../Modals/ModalDelete/ModalDelete";
//Assets
import Robot from "../../assets/robot/robot"; 

class TicketList extends Component{
    
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
    // status of the modal, false = not displayed
    showModalDelete: false
    }

    handleRemoveTask = (index) => {
        let tickets = [...this.state.tickets];
        // slice ticket array at index
        tickets.splice(this.state.taskDelKey, 1);
        
        this.setState({tickets}, () => {
            // call the close modal function
            this.handleCloseDeleteModal();
        });
    }

    // Shows the delete modal
    handleShowDeleteModal = (index,title) =>{
        this.setState({
            taskDelKey: index,
            taskDelTitle: title,
            showModalDelete: true
        })
    }
    // closes the delete Modal
    handleCloseDeleteModal = () =>{
        this.setState({
            showModalDelete: false
        })
    }

    render(){
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
        <div className={classes.ticketList}>
            {this.state.tickets.map((tasks, index) => <Ticket
            // Handlers 
            handleTaskDelete={() => this.handleShowDeleteModal(index, this.state.tickets[index].taskTitle)} 
            handleTaskRemover={() => this.handleTaskRemove(index)} 
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