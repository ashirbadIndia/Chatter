import React from 'react';
import {connect} from 'react-redux';

import './css/conversation-header.css';
import SettingDropdown from './header-content-extras/SettingDropdown';
import avatar from '../../static/avatar.svg'
import UserDetail from './header-content-extras/UserDetail';


const ConversationHeader = (props)=> {
    const [modalShow, setModalShow] = React.useState(false);
    return(
        <div className="conversationHeader">
            <div className="media">
            <img src={avatar} class="align-self-center mr-3 avatar" alt="avatar"/>
                <div className="media-body">
                    <h4 className="mt-0">Ashirbad</h4>
                    <p>last active</p>
                </div>
            </div>
            <div className="options">
                <SettingDropdown/>
                <div className="icon" onClick={() => setModalShow(true)}>
                    <ion-icon name="information-circle-outline"/>
                </div>
                <UserDetail
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </div>
    )
}

export default connect()(ConversationHeader);