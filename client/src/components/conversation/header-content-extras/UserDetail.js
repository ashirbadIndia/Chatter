import React from 'react';
import {Modal,Button} from 'react-bootstrap';

import avatar from '../../../static/avatar.svg'
import '../css/user-detail.css';

export default (props)=>{
    return(
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <div className="m-header">
                        <div className="center">
                            <img src={avatar} className="avatar-medium" alt="user"/>
                            <h3>User Name</h3>
                            <p>User Bio</p>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="details">
                        <h5>
                            Username:
                        </h5>
                        <p>
                            user420
                        </p>
                    </div>
                    <div className="details">
                        <h5>
                            Email Id:
                        </h5>
                        <p>
                            user@email.com
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}