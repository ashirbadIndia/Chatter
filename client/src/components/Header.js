import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {Nav,Navbar} from 'react-bootstrap';

import avatar from '../static/avatar-white.svg';
import {logout} from '../actions/user';
//import './conversation/css/dropdown.css'

class Header extends React.Component{

    userIcon = ()=>{
        if(this.props.auth.isSignedIn){
            return(
                <div className="dropdown drp-right">
                    <div className="dropbtn white">
                        <img src={avatar} alt="user-avatar"/>
                    </div>
                    <div className="dropdown-content">
                        <div className="no-reactivity">
                            <small>Signed in as</small>
                            <h5>
                            {this.props.auth?this.props.auth.user.firstName:""}
                            </h5>
                        </div>
                        <Link to="/about-me">About Me</Link>
                        <Link to="/user/edit">Edit Profile</Link>
                        <Link to="/user/delete">Delete Profile</Link>
                        <div onClick={()=>{this.props.logout();}}>Sign out</div>
                    </div>
                </div>
            )
        }
        else{
            return null;
        }

    }

    render(){
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#welcome">Chatter</Navbar.Brand>
                <Nav className="mr-auto">
                    <Link className="nav-link active" to="/welcome">Home</Link>
                    <Link className="nav-link active" to="/contacts">Contacts</Link>
                </Nav>
                {this.userIcon()}
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth : state.auth
    }
}

export default connect(mapStateToProps,{logout})(Header);