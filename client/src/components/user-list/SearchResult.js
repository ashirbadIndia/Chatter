import React from 'react';
import {connect} from 'react-redux';

import Card from './Card'
import {addContact} from '../../actions/contacts'
import './css/list.css'

class SearchResults extends React.Component{
    
    createContact = ({id})=>{
        if(!this.props.contacts.find(element => element.id === id)){
            this.props.addContact(this.props.auth.id,id);
        }
    }
    renderList = ()=>{
        return this.props.searchResults.map((item)=>{
            return(
                <Card key={`${item.userId}`} 
                    firstName={item.firstName}
                    lastName={item.lastName}
                    bio={item.bio}
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
            </div>
            </>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        searchResults : state.searchResults? state.searchResults: [],
        auth: state.auth.user,
        contacts: state.contacts.all
    }
}

export default connect(mapStateToProps,{addContact})(SearchResults);