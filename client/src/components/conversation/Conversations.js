import React from 'react';
import {connect} from 'react-redux';
import {Container} from 'react-bootstrap';

import ConversationHeader from './ConversationHeader';
import ConversationBody from './ConversationBody';
import ConversationField from './ConversationField';
import {socketConnect, socketDisconnect, syncChats} from '../../actions/chat';

import './css/Messenger.css';

class Chat extends React.Component{
    componentDidMount = async ()=>{
        if(this.props.match.params.id){
            await this.props.socketConnect(this.props.match.params.id,this.props.auth.token);
        }
    }
    componentWillUnmount = ()=>{
        this.props.socketDisconnect();
    }
    componentDidUpdate=()=>{
        if(this.props.chatroom.isConnected && !this.props.chatroom.isSynced){
            this.props.syncChats();
        }
    }
    render(){
        return(
            <div>
                <Container className='message-box' style={{height: '100vh-56px'}}>
                    <ConversationHeader/>
                    <ConversationBody/>
                    <ConversationField/>
                </Container>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        auth: state.auth,
        chatroom: state.chatRoom
    }
}

export default connect(mapStateToProps,{socketConnect,socketDisconnect,syncChats})(Chat);