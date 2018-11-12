import React, { Component } from "react";
import classes from "./NewTaskForm.css";
import axios from "axios";

class TaskForm extends Component{
        state = {
            taskAssignedName: null,
            taskAssignedPriority: null,
            taskAssignedTitle: null,
            taskAssignedDescription: null,
            taskAssignedTime: null
        }
    
    validateTask(event){
        event.preventDefault();
        let taskNameRef = this.refs.taskNameRef.value;
        let taskPriorityRef = this.refs.taskPriorityRef.value;
        let taskTitleRef = this.refs.taskTitleRef.value;
        let taskDescriptionRef = this.refs.taskDescriptionRef.value;
        let taskTimeref = new Date();
        //taskTimeref = taskTimeref.toUTCString();
        taskTimeref = taskTimeref.toLocaleString('en-GB', { timeZone: 'UTC' });

        this.setState({
            taskAssignedName: taskNameRef,
            taskAssignedPriority: taskPriorityRef,
            taskAssignedTitle: taskTitleRef,
            taskAssignedDescription: taskDescriptionRef,
            taskAssignedTime: taskTimeref
        }, () => {
            this.sendTaskToPHP();
        });

    }

    clearFormInputs(){
        document.getElementById('personInput').value = "";
        document.getElementById('priorityInput').value = "";
        document.getElementById('titleInput').value = "";
        document.getElementById('descInput').value = "";
        this.setState({
            taskAssignedName: null,
            taskAssignedTitle: null,
            taskAssignedPriority: null,
            taskAssignedDescription: null,
            taskAssignedTime: null
        })
    }
    // Runs Async when setState has finished 
    sendTaskToPHP(){
        this.clearFormInputs();
        // POST to PHP
        let postURL = "https://tasks.jollyit.co.uk/php/postTasks.php";
        
        axios.post(postURL, {
            name: this.state.taskAssignedName,
            priority: this.state.taskAssignedPriority,
            title: this.state.taskAssignedTitle,
            desc: this.state.taskAssignedDescription,
            time: this.state.taskAssignedTime
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    } 


    render(){
        return(
            <div className={classes.bottom}>
            <div className={classes.add}>
                <div className={classes.add__container}>
                <form onSubmit={this.validateTask.bind(this)}>
                    <select className={classes.add__name} ref="taskNameRef" >
                      <option value="-" disabled="disabled" defaultValue id="personInput" selected required="true">Name</option>
                        <option value="Anyone">Anyone</option>
                        <option value="Ben">Ben</option>
                        <option value="Casey">Casey</option>
                        <option value="Lewis">Lewis</option>
                        <option value="Jude">Jude</option>
                        <option value="Tony">Tony</option>
                        <option value="Tom">Tom</option>
                    </select>
                    <select className={classes.add__name} ref="taskPriorityRef" required="true">
                      <option value="-" disabled="disabled" defaultValue id="priorityInput" selected>Priority</option>
                        <option value="1">1 (Highest)</option>
                        <option value="2">2 (High)</option>
                        <option value="3">3 (Medium)</option>
                        <option value="4">4 (Low)</option>
                        <option value="5">5 (Low/When Convinent)</option>
                    </select>
                    <input type="text" required="true" id="titleInput"className={classes.add__title} placeholder="Add Task Title" ref="taskTitleRef"/>
                    <input type="text" required="true" id="descInput" className={classes.add__description} placeholder="Add Task Description" ref="taskDescriptionRef"/>
                    <button type="submit" className={classes.add__btn}>SUBMIT</button>
                    </form>
            </div>
            </div>
            </div>
        )
    }
}

export default TaskForm;