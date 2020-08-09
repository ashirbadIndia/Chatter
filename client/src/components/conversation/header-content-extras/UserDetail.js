import React from 'react';
import {Modal,Button} from 'react-bootstrap';

import avatar from '../../../static/avatar.svg'
import '../css/user-detail.css';
import { connect } from 'react-redux';

class userDetail extends React.Component{
    render(){

    return(
        <>
        
            <Modal
                show = {this.props.show}
                onHide = {this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton >
                    <div className="m-header">
                        <div className="center">
                            <img src={avatar} className="avatar-medium" alt="user"/>
                            <h3>{`${this.props.userdetail.firstName} ${this.props.userdetail.lastName}`}</h3>
                            <p>{this.props.userdetail.bio}</p>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="details">
                        <h5>
                            Email Id:
                        </h5>
                        <p>
                            {this.props.userdetail.emailId}
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
    }
}


const mapStateToProps = (state,props)=>{
    return {
        userdetail: state.chatRoom.userDetail? state.chatRoom.userDetail:{
            firstName:'',
            lastName:'',
            bio:'',
            emailId:''
        }
    }
}

export default connect(mapStateToProps)(userDetail);
