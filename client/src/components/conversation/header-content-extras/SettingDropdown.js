import React from 'react';
import {connect} from 'react-redux';

import ChatAction from './ChatAction';
import '../css/dropdown.css';

class SettingDropdown extends React.Component{
    state = {
        action: 'none',
        modalShow: false,
    }
    handleClose = () => this.setState({modalShow:false});
    handleShow = () => this.setState({modalShow:true});
    clearChat=()=>{
        this.setState({action: 'clearChat'});
        this.handleShow();
    }
    changeColor=()=>{
        this.setState({action: 'changeColor'});
        this.handleShow();
    }
    removeUser=()=>{
        this.setState({action: 'removeUser'});
        this.handleShow();
    }
    render(){
        return(
            <div className="dropdown">
                <div className="dropbtn">
                    <ion-icon name="settings-outline"/>
                </div>
                <div className="dropdown-content">
                    <div onClick={this.changeColor}>Choose Color</div>
                    <div onClick={this.clearChat}>Clear Chats</div>
                    <div onClick={this.removeUser}>Remove User</div>
                </div>
                <ChatAction 
                    show={this.state.modalShow} 
                    handleClose={this.handleClose} 
                    action={this.state.action}
                />
            </div>
        )
    }
}

export default connect()(SettingDropdown);



