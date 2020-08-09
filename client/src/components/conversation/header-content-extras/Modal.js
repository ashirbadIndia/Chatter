import React from 'react';
import {Modal,Button} from 'react-bootstrap';


export default (props)=>{
    const buttons=()=>{
        if(props.buttonsType === 'close'){
            return(
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            )
        }
        else if(props.buttonsType === 'y/n'){
            return(
                <>
                <Button variant="secondary" onClick={props.handleClose}>
                    No
                </Button>
                <Button variant="danger" onClick={()=>{
                            props.action()
                            props.handleClose()
                        }
                    }>
                    Yes
                </Button>
                </>
            )
        }
    }
    return(
        <>
            <Modal show={props.show} onHide={props.handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title>{props.modalHeading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.modalBody}</Modal.Body>
                <Modal.Footer>
                    {buttons()}
                </Modal.Footer>
            </Modal>
        </>
    )
}