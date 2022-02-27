import React from 'react'
import { Button, Modal } from 'react-bootstrap';

/**
* @author
* @function NewModal
**/

const NewModal = (props) => {
  return(
    <Modal
      show={props.show} onHide={props.handleClose} animation={false}
      size={props.size}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.Title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        {
          props.buttons ? props.buttons.map((button,index) => 
            <Button key={index} variant={button.color} onClick={button.onClick}>{button.label}</Button>
            ):
          <Button className="btn btn-sm btn-dark" onClick={props.handleSubmit}>{props.buttonTitle}</Button>
        }
        
      </Modal.Footer>
    </Modal>
   )

 }

export default NewModal