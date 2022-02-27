import React from 'react'
import { Form } from 'react-bootstrap';
/**
* @author
* @function FromInput
**/

const FromInput = (props) => {
  return(
    <Form.Group >
        <Form.Control className='input-class' type={props.type} placeholder={props.placeholder}
            value={props.value} onChange={props.onChange} ></Form.Control>
        <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
    </Form.Group>
   )

 }

export default FromInput