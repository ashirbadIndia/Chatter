import React from 'react'
import {connect} from 'react-redux';

import './css/Message.css'

const Chat = (props)=>{
    return(
        <div className={`message ${props.isMine?'mine':''} ${props.pos}`}>
                <div className="timestamp">
                    {props.timestamp}
                </div>
            <div className="bubble-container">
              <div className={`bubble ${props.color}`} title={'friendlyTimestamp'}>
                    {props.messageBody}
              </div>
            </div>
        </div>
    )

}

export default connect()(Chat);

