import React from 'react';
import {connect} from 'react-redux';
import {Container} from 'react-bootstrap';

import ConversationHeader from './ConversationHeader';
import ConversationBody from './ConversationBody';
import ConversationField from './ConversationField';

import './css/Messenger.css';

class Chat extends React.Component{

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
        auth: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps)(Chat);