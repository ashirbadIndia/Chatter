import React from 'react';
import { connect } from 'react-redux';

import Modal from './Modal';
import ColorChooser from './ColorChooser';
import {clearChat} from '../../../actions/chat';
import {removeContact} from '../../../actions/contacts';
import history from '../../../other/history'



const modalBody={
    none:"",
    clearChat:"All conversations will be removed. This step can't be undone.",
    changeColor: <ColorChooser/>,
    removeUser:"All conversations will be removed and the user will be removed from your contact list. However He/She can again start a conversation with you."
}
const modalHeading={
    none:"",
    clearChat:"Are you sure to clear all conversations",
    changeColor:"Change Chat color",
    removeUser:"Are you sure you want to remove this user"
}

class ChatAction extends React.Component{ 
    actions ={
        clearChat:()=>{
                this.props.clearChat();
            },
        removeUser:()=>{
                const contactInfo = this.props.contacts.find((i)=> i.chatId === this.props.chatId );
                this.props.removeContact({...contactInfo},this.props.auth.token);
                this.props.clearChat();
                history.push('/contacts');
            },
    
        changeColor:()=>{
                
            }
    }
        render(){
            return(
                <>
                    <Modal
                        show={this.props.show}
                        modalHeading={modalHeading[this.props.action]}
                        modalBody={modalBody[this.props.action]}
                        handleClose={this.props.handleClose}
                        buttonsType={this.props.action === 'changeColor'? 'close':'y/n'}
                        action={this.actions[this.props.action]}
                    />
                </>
            )
            
        }
}

const mapStateToProps = (state)=>{
    return{
        auth: state.auth,
        chatId: state.chatRoom.chatRoomId,
        contacts: state.contacts.all
    }
}

export default connect(mapStateToProps,{clearChat,removeContact})(ChatAction);