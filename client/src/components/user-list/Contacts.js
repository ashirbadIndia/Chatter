import React from 'react';
import {connect} from 'react-redux';
import {Container, Jumbotron} from 'react-bootstrap';

import ContactList from './ContactList';
import SearchResults from './SearchResult';
import {syncContacts} from '../../actions/contacts';
import {searchUser} from '../../actions/user'
import './css/list.css'


class Contacts extends React.Component{

    state = { showSearchResult: false, search:""};
    onFocus = ()=>{
        this.setState({showSearchResult: true});
    }
    onBlur = ()=>{
        if(!this.props.searchResults.length)
        this.setState({showSearchResult: false});
    }
    onChange = (e)=>{
        this.setState({search: e.target.value});
    }
    renderResults(){
        if(this.state.showSearchResult){
            return <SearchResults />
        }
        else return null;
    }
    getContacts(){
        if(this.props.isSynced){
            console.log(this.props.isSynced);
            return <ContactList/>
        }
        else return(
            <h6>Loading...</h6>
        )
    }
    onSubmit = (e)=>{
        e.preventDefault();
        this.props.searchUser(this.state.search);
    }
    componentDidMount = ()=>{
        if(!this.props.isSynced){
            if(this.props.auth.user)
            this.props.syncContacts(this.props.auth.user.id);
        }
    }
    render(){
        return(
            <>
            <Jumbotron fluid>
                <Container>
                <form onSubmit={this.onSubmit}>
                    <div className="input-group input-group-lg">
                        <input type="text" 
                                className="form-control" 
                                placeholder="Search users" 
                                aria-label="Sizing example input" 
                                aria-describedby="inputGroup-sizing-lg"
                                name="search"
                                value={this.state.search}
                                onChange={this.onChange}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                                />
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-lg">
                                <ion-icon name="search-outline" className="search-icon"/>
                            </span>
                        </div>
                    </div>
                </form>
                <p className="lead"><br/>Search for users inside or outside your contact list. Once you initialize conversation, the user will be added to your contact list.</p>
                </Container>
            </Jumbotron>
            <Container>
                {this.renderResults()}
                <h1 className="display-4 sml contact-title">Contacts</h1>
                {this.getContacts()}
            </Container>
            </>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        auth: state.auth,
        isSynced: state.contacts.isSynced,
        searchResults: state.searchResults
    }
}

export default connect(mapStateToProps,{syncContacts,searchUser})(Contacts);