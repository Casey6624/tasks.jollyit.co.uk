import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalComplete = (props) => {
  if(!props.show){
    return <div></div>
  }  
  return(
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>COMPLETE TASK</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      Are you sure you want to complete the task below?
      <br/><br />
      <strong>{props.taskToComplete}</strong><br/><br/>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={props.completeTaskFromState} bsStyle="success">Complete Task</Button>
      </Modal.Footer>
    </Modal.Dialog>
    )
}

export default ModalComplete;
