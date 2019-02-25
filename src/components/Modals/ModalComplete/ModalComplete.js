import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalComplete = (props) => {
  if(!props.show){
    return null
  }  

  const {taskTitle, taskDescription} = props.taskToCompDetails;
  const {onHide, completeTaskFromState} = props;
  return(
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>COMPLETE TASK</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      Are you sure you want to complete the task below?
      <br/><br />
      <strong>{taskTitle}</strong><br/><br/>
      <p>{taskDescription}</p>
      <hr />
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={completeTaskFromState} id="comp" bsStyle="success">Complete Task</Button>
      </Modal.Footer>
    </Modal.Dialog>
    )
}

export default ModalComplete;
