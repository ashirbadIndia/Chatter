import React from 'react';
import {ListGroup} from 'react-bootstrap';
import {connect} from 'react-redux';

import Chat from './Chat';

const a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,19,20];

const ConversationBody = (props)=> {
    const diva= a.map((item)=>{
        return (
            <Chat 
                timestamp="timestamp" 
                isMine={true /*true false*/}
                pos={'start'/*start end*/}
                messageBody={'some crazy big message, I mean Really big, big enough for 3 lines, I repeat 3 lines'}
                color={props.chatColor}
                />
        )
    })
    return(
        <div className="overflow-auto message-body">
            <ListGroup>
                {diva}
            </ListGroup>
        </div>
       
    )
}

const mapStateToProps=(state)=>{
    return{
        chatColor: state.chatColor
    }
}

export default connect(mapStateToProps)(ConversationBody);