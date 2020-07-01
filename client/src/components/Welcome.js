import React from 'react';
import {connect} from 'react-redux';
import {Jumbotron, Container, Row,Col} from 'react-bootstrap';

import avatar from '../static/avatar.svg';
import './user/css/user-detail.css';
import RecentList from './user-list/RecentList';
import FavouriteList from './user-list/FavouriteList';
import {syncContacts} from '../actions/contacts';

class Welcome extends React.Component{
    userName = this.props.auth.user?this.props.auth.user.firstName:"";
    componentDidMount = ()=>{
        if(!this.props.contacts.isSynced){
            if(this.props.auth.user)
            this.props.syncContacts(this.props.auth.user.id);
        }
    }
    getFavourites(){
        if(this.props.contacts.isSynced){
            return <FavouriteList/>
        }
        else return(
            <h6>Loading...</h6>
        )
    }
    getRecentList(){
        if(this.props.contacts.isSynced){
            return <RecentList/>
        }
        else return(
            <h6>Loading...</h6>
        )
    }
    render(){
        return(
            <>
                <Jumbotron fluid>
                    <div className="center">
                        <img src={avatar} className="avatar-large" alt="user"/>
                        <h1 className="display-4 lgs">Welcome, {this.userName}</h1>
                        <p className="lead">Don't hesitate to start conversation.</p>
                    </div>
                </Jumbotron>
                <Container className="center">
                    <Row sm={1} md={2} xs={1}>
                        <Col className="column">
                            <h1 className="display-4 sml">Recent</h1>
                            {this.getRecentList()}
                        </Col>
                        <Col>
                            <h1 className="display-4 sml">Favourites</h1>
                            {this.getFavourites()}
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        auth: state.auth,
        contacts: state.contacts
    }
}

export default connect(mapStateToProps,{syncContacts})(Welcome);