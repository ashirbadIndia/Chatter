import React from 'react';
import {connect} from 'react-redux';

import Card from './Card'
import {addContact} from '../../actions/contacts'
import history from '../../other/history'
import './css/list.css'

class SearchResults extends React.Component{
    
    createContact = ({id})=>{
        if(!this.props.contacts.find(element => element.userId === id)){
            this.props.addContact(id,this.props.token);
        }
        const userId=id;
        const myId= this.props.auth.id;
        const chatRoomId = (myId >= userId)?`${userId}-${myId}`:`${myId}-${userId}`;
        history.push(`/chat/${chatRoomId}`);
    }
    renderList = ()=>{
        return this.props.searchResults.map((item)=>{
            return(
                <Card key={`${item.userId}`} 
                    firstName={item.firstName}
                    lastName={item.lastName}
                    info={item.bio}
                    id={item.id}
                    handleClick= {this.createContact}
                />
            )
        });
    }

    render(){
        return(
            <>
            <h1 className="display-4 sml contact-title">Results</h1>
            <div className="list-left">
                {this.renderList()}
                <div className='gap'/>
            </div>
            </>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        searchResults : state.searchResults? state.searchResults: [],
        auth: state.auth.user,
        contacts: state.contacts.all,
        token: state.auth.token
    }
}

export default connect(mapStateToProps,{addContact})(SearchResults);