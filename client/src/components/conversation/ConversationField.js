import React from 'react';
import {connect} from 'react-redux';
import './css/field.css';

const ConversationField = (props)=> {
    return(
        <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message, "
        />
        <div className="toolbar-button">
        <ion-icon name="send-outline"></ion-icon>
        </div>
      </div>
    )
}

export default connect()(ConversationField);