import React from 'react';
import {connect} from 'react-redux';
import {Jumbotron, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import avatar from '../../static/avatar.svg';
import '../user/css/user-detail.css';

class AboutMe extends React.Component{

    render(){
        return(
            <>
                <Jumbotron fluid>
                    <div className="center">
                        <img src={avatar} className="avatar-large" alt="user"/>
                        <h1 className="display-4 lgs">{this.props.user?`${this.props.user.firstName} ${this.props.user.lastName}`:'user-name'}</h1>
                        <p className="lead">{this.props.user?this.props.user.bio:''}</p>
                    </div>
                </Jumbotron>
                <Container className="center">
                    <div className="details">
                        <h5>
                            Email Id:
                        </h5>
                        <p>
                            {this.props.user?this.props.user.emailId:''}
                        </p>
                    </div>
                    <Link to="/user/edit">Edit Details</Link>
                </Container>
            </>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(AboutMe);