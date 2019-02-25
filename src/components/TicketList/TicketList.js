//Libaries
import React, { useState, useEffect } from "react";
import axios from "axios";
//import _ from "lodash";
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
    const [taskDelKey, setTaskDelKey] = useState(null)
    const [taskCompleteTitle, setTaskCompleteTitle] = useState("")
    const [taskCompleteKey, setTaskCompleteKey] = useState(null)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalComplete, setShowModalComplete] = useState(false)
    const [tasksAreAvailable, setTasksAreAvailable] = useState(false)
    const [completedTaskCount, setCompletedTaskCount] = useState(null)

    // Check DB on first load of app
    useEffect(() => {
        callDB()
    }, [])

    // Check DB every 5 seconds
    setInterval(() => {
        callDB()
    }, 5000 )
    
    // removes the task from state at it's current index
    function handleRemoveTask(){
        handleCloseModals("event", "del")
            let taskID =  tickets[taskDelKey].taskID
            let taskDelURL = "https://tasks.jollyit.co.uk/php/postDelTask.php";
            axios.post(taskDelURL, {
                taskID
              }, function(){
                let tempTickets = [...tickets];
                // slice ticket array at index
                tickets.splice(taskDelKey, 1);
                
                setTickets(tempTickets)
              })
              .catch((error) => {
                console.log(error);
              });
    }

    function handleCompleteTask(){
        handleCloseModals("event", "comp")
        let taskID =  tickets[taskCompleteKey].taskID
        let postCompletedTaskURL = "https://tasks.jollyit.co.uk/php/postCompletedTasks.php";
        axios.post(postCompletedTaskURL, {
            taskID
          }, function() {
            let tempTickets = [...tickets];
            // slice ticket array at index
            tempTickets.splice( taskCompleteKey, 1);
            setTickets(tempTickets)
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    // Shows the delete modal
    function handleShowModals(e, taskDetails, type){
        let taskSelected = tickets.findIndex(task => task.taskID === taskDetails.taskID)
        switch(type){
            case "comp":
            setTaskCompleteKey(taskSelected)
            setShowModalComplete(true)
            break;
            case "del":
            setTaskDelKey(taskSelected)
            setShowModalDelete(true)
            break;
            default:
            break;
        }
    }

    // closes the delete Modal
    function handleCloseModals(e, type){
        if(type === "del"){
            setShowModalDelete(false)
        }else if(type === "comp"){
            setShowModalComplete(false)
        }
            
    }

    // The axios HTTP request to the PHP server
    function callDB(){
        axios.get("https://tasks.jollyit.co.uk/php/getTasks.php")
        .then(function(res){
            setTickets(res.data)})
/*         axios.get("https://tasks.jollyit.co.uk/php/getCompletedTasksCount.php")
        .then(res => setCompletedTaskCount(res.data.taskCount)
        ) */
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
        onHide={e => handleCloseModals(e, "del")} 
        removeTaskFromState={handleRemoveTask} 
        taskToDelDetails={tickets[taskDelKey]}
        />
        <ModalComplete 
        show={showModalComplete}
        onHide={e => handleCloseModals(e, "comp")}
        completeTaskFromState={handleCompleteTask} 
        taskToCompDetails={tickets[taskCompleteKey]}
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
            handleTaskDelete={e => handleShowModals(e, tickets[index], "del")} 
             // remove task from state
            //handleTaskRemover={handleTaskRemove(index)}  
            // pop up complete modal
            handleTaskComplete={e => handleShowModals(e, tickets[index], "comp")}
             // remove completed task from state
            //handleTaskCompleter={handleTaskComplete(index)} 
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
        