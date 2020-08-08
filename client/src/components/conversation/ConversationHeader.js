import React from 'react';
import {connect} from 'react-redux';

import './css/conversation-header.css';
import SettingDropdown from './header-content-extras/SettingDropdown';
import avatar from '../../static/avatar.svg'
import UserDetail from './header-content-extras/UserDetail';


class ConversationHeader extends React.Component {
    state = {modalShow : false}
    setModalShow = (st)=>{
        this.setState({modalShow: st});
    }
    render(){
            return(
                <div className="conversationHeader">
                    <div className="media">
                    <img src={avatar} className="align-self-center mr-3 avatar" alt="avatar"/>
                        <div className="media-body">
                            <h4 className="mt-0">
                                {
                                    this.props.userDetail?
                                    `${this.props.userDetail.firstName} ${this.props.userDetail.lastName}`:
                                    'User Name'}
                            </h4>
                            <p>last active</p>
                        </div>
                    </div>
                    <div className="options">
                        <SettingDropdown/>
                        <div className="icon" onClick={() => this.setModalShow(true)}>
                            <ion-icon name="information-circle-outline"/>
                        </div>
                        <UserDetail
                            show={this.state.modalShow}
                            onHide={() => this.setModalShow(false)}
                        />
                    </div>
                </div>
            )
    }

}

const mapStateToProps=(state)=>{
    return {
        userDetail: state.chatRoom.userDetail
    }
}

export default connect(mapStateToProps)(ConversationHeader);