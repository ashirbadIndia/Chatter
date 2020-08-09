import React from 'react';
import {ListGroup} from 'react-bootstrap';
import {connect} from 'react-redux';

import Chat from './Chat';

class ConversationBody extends React.Component{
    messages=()=>{
        if(!this.props.chatRoom.messages){
            return null;
        }
        else{
            return this.props.chatRoom.messages.map((item)=>{
                return (
                    <Chat 
                        timestamp="" 
                        isMine={this.props.chatRoom.myDetail._id === item.author?true:false /*true false*/}
                        pos='start'
                        messageBody={item.message}
                        color={this.props.chatRoom.color}
                        key={item._id}
                        />
                )
            })
        }   
    }
    render(){
        return(
            <div className="overflow-auto message-body">
                <ListGroup>
                    {this.messages()}
                </ListGroup>
            </div>
           
        )
    }
}  



const mapStateToProps=(state)=>{
    return{
        chatRoom: state.chatRoom
    }
}

export default connect(mapStateToProps)(ConversationBody);