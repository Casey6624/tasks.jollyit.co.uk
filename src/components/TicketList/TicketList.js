//Libaries
import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
//Components
import Ticket from "../Ticket/Ticket";
import classes from "./TicketList.css";
import ModalDelete from "../Modals/ModalDelete/ModalDelete";
import ModalComplete from "../Modals/ModalComplete/ModalComplete";
import TicketStats from "../TicketStats/TicketStats";
import Loading from "../SVGSpinner/Loading";
//Assets
import Robot from "../../assets/robot/robot"; 

export default function TicketList(props){

    const [tickets, setTickets] = useState([])
    const [taskDelTitle, setTaskDelTitle] = useState("")
    const [taskDelKey, setTaskDelKey] = useState(null)
    const [taskCompleteTitle, setTaskCompleteTitle] = useState("")
    const [taskCompleteKey, setTaskCompleteKey] = useState(null)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalComplete, setShowModalComplete] = useState(false)
    const [tasksAreAvailable, setTasksAreAvailable] = useState(false)
    const [firstTimeGetTasks, setFirstTimeGetTasks] = useState(true)
    const [completedTaskCount, setCompletedTaskCount] = useState(null)

    // removes the task from state at it's current index
    function handleRemoveTask(index){
        let tempTickets = [...tickets];
        // slice ticket array at index
        tickets.splice(taskDelKey, 1);
        let taskID =  taskDelKey;
        setTickets(tempTickets)
            // call the close modal function
            handleCloseDeleteModal();
            // Call Axios POST to delete task
            let taskDelURL = "https://tasks.jollyit.co.uk/php/postDelTask.php";
            axios.post(taskDelURL, {
                taskID
              })
              .then((response) => {
                callDB();
              })
              .catch((error) => {
                console.log(error);
              });
    }

    function handleCompleteTask(index){
        let tempTickets = [...tickets];
        // slice ticket array at index
        tempTickets.splice( taskCompleteKey, 1);
        setTickets(tempTickets)
        handleCloseCompleteModal();
        // Need to add insert into DB completed table function
        let postCompletedTaskURL = "https://tasks.jollyit.co.uk/php/postCompletedTasks.php";
        
        axios.post(postCompletedTaskURL, {
            taskID:  taskCompleteKey
          })
          .then((response) => {
            callDB();
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    // Shows the delete modal
    function handleShowDeleteModal(index,taskID, title){
            setTaskDelKey(taskID)
            setTaskDelTitle(title)
            setShowModalDelete(true)
    }

    // Shows the delete modal
    function handleShowCompleteModal(index, taskID, title){
            setTaskCompleteKey(taskID)
            setTaskCompleteTitle(title)
            setShowModalComplete(true)
    }

    // closes the delete Modal
    function handleCloseDeleteModal(){
            setShowModalDelete(false)
    }

    // closes the complete Modal
    function handleCloseCompleteModal(){
            setShowModalComplete(false)
    }

    useEffect(() => {
        setFirstTimeGetTasks(false)
        callDB()
    }, [])
    // The axios HTTP request to the PHP server
    function callDB(){
        axios.get("https://tasks.jollyit.co.uk/php/getTasks.php")
        .then(res => setTickets(res.data))
        axios.get("https://tasks.jollyit.co.uk/php/getCompletedTasksCount.php")
        .then(res => setCompletedTaskCount(res.data.taskCount)
        )
    }
        if( tickets.length === 0 && ! tasksAreAvailable){
            return(
                <div className={classes.noTasks}>
                <p>BOOM! We're killing it.</p>
                NO <span>TASKS</span> CURRENTLY ASSIGNED
                    <Robot/>
                </div>
                )
            }
        else if( tickets.length === 0 ){
            return(
                <Loading />
            )
        }
        
    return(
        <div>
        <ModalDelete 
        show={showModalDelete} 
        // Hide Modal
        onHide={handleCloseDeleteModal} 
        removeTaskFromState={handleRemoveTask} 
        // Displays the task title in the modal
        taskToDel={taskDelTitle}
        />
        <ModalComplete 
        show={showModalComplete}
        onHide={handleCloseCompleteModal}
        completeTaskFromState={handleCompleteTask} 
        taskToComplete={taskCompleteTitle} 
        />
        <div className={classes.ticketList}>
        <TicketStats 
            bsStyle="col-4"
            outstandingTickets={tickets.length} 
            completedTaskCount={completedTaskCount}
        />
            { tickets.map((tasks, index) => <Ticket
            // Handlers-------------------------------
            // pop up del modal 
            handleTaskDelete={handleShowDeleteModal(index,  tickets[index].taskID,  tickets[index].taskTitle)} 
/*             // remove task from state
            handleTaskRemover={handleTaskRemove(index)}  */
            // pop up complete modal
            handleTaskComplete={handleShowCompleteModal(index,  tickets[index].taskID,  tickets[index].taskTitle)}
/*             // remove completed task from state
            handleTaskCompleter={handleTaskComplete(index)} */
            // Task attributes
            key={ tickets[index].taskID} 
            taskTitle={ tickets[index].taskTitle} 
            taskAssignedTo={ tickets[index].taskAssignedTo}
            taskPriority={ tickets[index].priority}  
            timeAssigned={ tickets[index].timeAssigned} 
            taskDescription={ tickets[index].taskDescription}>
            </Ticket>)}
        </div>
        </div>
    )
}