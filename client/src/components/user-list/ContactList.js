import React from 'react';
import {connect} from 'react-redux';

import Card from './Card'
import './css/list.css'
import {removeContact} from '../../actions/contacts';

class ContactList extends React.Component{
    onClick=(props)=>{
        if(props.removed){
            this.props.removeContact(this.props.auth.id,props.id);
        }
    }
    renderList = ()=>{
        return this.props.contactList.map((item)=>{
            return(
                <Card key={`${item.userId}`} 
                    firstName={item.firstName}
                    lastName={item.lastName}
                    bio={item.bio}
                    id={item.userId}
                    handleClick= {this.onClick}
                    removed = {item.removed}
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
        auth: state.auth.user
    }
}

export default connect(mapStateToProps,{removeContact})(ContactList);