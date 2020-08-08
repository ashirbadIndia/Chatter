import React from 'react';
import {connect} from 'react-redux';

import history from '../../other/history';
import Card from './Card'
import './css/list.css'
import {removeContact} from '../../actions/contacts';

class ContactList extends React.Component{
    onClick=(props)=>{
        if(props.not_exist){
            this.props.removeContact({id: props.id,chatId:props.chatId},this.props.token);
        }
        else{
            const userId=props.userId;
            const myId= this.props.auth.id;
            const chatRoomId = (myId >= userId)?`${userId}-${myId}`:`${myId}-${userId}`;
            history.push(`/chat/${chatRoomId}`);
        }
    }
    renderList = ()=>{
        return this.props.contactList.map((item)=>{
            console.log(item);
            return(
                <Card key={`${item.userId}`} 
                    firstName={item.firstName}
                    lastName={item.lastName}
                    info={item.bio?item.bio:''}
                    id={item.id}
                    userId={item.userId}
                    chatId={item.chatId}
                    handleClick= {this.onClick}
                    not_exist = {item.not_exist}
                />
            )
        });
    }
    render(){
        return(
            <div className="list-left">
                {this.renderList()}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        contactList : state.contacts.all? state.contacts.all: [],
        auth: state.auth.user,
        token: state.auth.token
    }
}

export default connect(mapStateToProps,{removeContact})(ContactList);