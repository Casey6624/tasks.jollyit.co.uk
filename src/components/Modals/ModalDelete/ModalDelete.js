import React from "react";
//import classes from "./ModalDelete.css";
import { Button, Modal } from "react-bootstrap";

const ModalDelete = (props) => {
  if(!props.show){
    return <div></div>
  }  
  return(
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>DELETE TASK</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      Are you sure you want to delete the selected task below?
      <br/><br />
      <strong>{props.taskToDel}</strong><br/><br/>
      <p>Warning! This will not be reversible.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={props.removeTaskFromState} bsStyle="danger">Delete Task</Button>
      </Modal.Footer>
    </Modal.Dialog>
    )
}

export default ModalDelete;
