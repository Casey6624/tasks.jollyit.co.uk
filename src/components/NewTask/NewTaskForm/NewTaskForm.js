import React, { Component } from "react";
import classes from "./NewTaskForm.css";

class TaskForm extends Component{
        state = {
            taskAssignedName: null,
            taskAssignedTitle: null,
            taskAssignedDescription: null,
            taskAssignedTime: null
        }
    
    validateTask(event){
        event.preventDefault();
        let taskNameRef = this.refs.taskNameRef.value;
        let taskTitleRef = this.refs.taskTitleRef.value;
        let taskDescriptionRef = this.refs.taskDescriptionRef.value;
        let taskTimeref = new Date();

        this.setState({
            taskAssignedName: taskNameRef,
            taskAssignedTitle: taskTitleRef,
            taskAssignedDescription: taskDescriptionRef,
            taskAssignedTime: taskTimeref
        }, () => {
            this.sendTaskToPHP();
        });

    }
    // Runs Async when setState has finished 
    sendTaskToPHP(){
        let objForPHP = {};
        objForPHP.name = this.state.taskAssignedName;
        objForPHP.title = this.state.taskAssignedTitle;
        objForPHP.desc = this.state.taskAssignedDescription;
        objForPHP.time = this.state.taskAssignedTime;
    } 


    render(){
        return(
            <div className={classes.bottom}>
            <div className={classes.add}>
                <div className={classes.add__container}>
                <form onSubmit={this.validateTask.bind(this)}>
                    <select className={classes.add__name} ref="taskNameRef" >
                      <option value="-" disabled="disabled" defaultValue >Name</option>
                        <option value="Anyone">Anyone</option>
                        <option value="Ben">Ben</option>
                        <option value="Casey">Casey</option>
                        <option value="Lewis">Lewis</option>
                        <option value="Jude">Jude</option>
                        <option value="Tony">Tony</option>
                        <option value="Tom">Tom</option>
                    </select>
                    <input type="text" required="true" className={classes.add__title} placeholder="Add Task Title" ref="taskTitleRef"/>
                    <input type="text" required="true" className={classes.add__description} placeholder="Add Task Description" ref="taskDescriptionRef"/>
                    <button type="submit" className={classes.add__btn}><i className="ion-ios-checkmark-outline"></i></button>
                    </form>
            </div>
            </div>
            </div>
        )
    }
}

export default TaskForm;