import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ModalDelete(props){

  if(!props.show){
    return null
  }

  // destructure props 
  const { taskTitle, taskDescription } = props.taskToDelDetails

  const { onHide, removeTaskFromState } = props

  return(
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>DELETE TASK</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      Are you sure you want to delete the selected task below?
      <br/><br />
      <strong>{taskTitle}</strong><br/><br/>
      <p>{taskDescription}</p>
      <hr />
      <p><span style={{color: "red", fontWeight: "bold"}}>Warning!</span> This will not be reversible.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={removeTaskFromState} bsStyle="danger">Delete Task</Button>
      </Modal.Footer>
    </Modal.Dialog>
    )
}
