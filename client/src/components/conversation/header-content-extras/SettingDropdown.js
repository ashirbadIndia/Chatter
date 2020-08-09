import React from 'react';
import {connect} from 'react-redux';

import ChatAction from './ChatAction';
import {removeFav, addFav} from '../../../actions/contacts'
import '../css/dropdown.css';

class SettingDropdown extends React.Component{
    state = {
        action: 'none',
        modalShow: false,
    }
    handleClose = () => this.setState({modalShow:false});
    handleShow = () => this.setState({modalShow:true});
    clearChat=()=>{
        this.setState({action: 'clearChat'});
        this.handleShow();
    }
    changeColor=()=>{
        this.setState({action: 'changeColor'});
        this.handleShow();
    }
    removeUser=()=>{
        this.setState({action: 'removeUser'});
        this.handleShow();
    }
    favStat=()=>{
        const userInfo = this.props.favourites.find( item=> item.userId === this.props.userId);
        if(userInfo){
            return {
                text: "Remove from Favourites",
                action: ()=>{
                    this.props.removeFav(this.props.userId,this.props.token);
                }
            }
        }
        else{
            return {
                text: "Add to Favourites",
                action: ()=>{
                    this.props.addFav(this.props.userId,this.props.token);
                }
            }
        }
    }
    render(){
        return(
            <div className="dropdown">
                <div className="dropbtn">
                    <ion-icon name="settings-outline"/>
                </div>
                <div className="dropdown-content">
                    <div onClick={this.changeColor}>Choose Color</div>
                    <div onClick={this.clearChat}>Clear Chats</div>
                    <div onClick={this.removeUser}>Remove User</div>
                    <div onClick={this.favStat().action}>{this.favStat().text}</div>
                </div>
                <ChatAction 
                    show={this.state.modalShow} 
                    handleClose={this.handleClose} 
                    action={this.state.action}
                />
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    console.log(state.chatRoom.userInfo);
    return {
        favourites: state.contacts.favourites?state.contacts.favourites:[],
        userId: (state.chatRoom.userDetail)?state.chatRoom.userDetail._id:null,
        token: state.auth.token
    }
}

export default connect(mapStateToProps,{removeFav,addFav})(SettingDropdown);



