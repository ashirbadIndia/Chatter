import React from 'react';

import avatar from '../../static/avatar.svg';
import './css/card.css'


export default (props)=>{
    return(
        <div className={`media user-card ${props.removed?"removed":""}`} onClick={()=>{props.handleClick(props)}}>
            <img src={props.avatar?props.avatar:avatar} className="align-self mr-3 avatar-sm" alt="user-avatar"/>
            <div className="media-body">
                <h5 className="mt-0">{props.firstName?`${props.firstName} ${props.lastName}`:'Someone'}</h5>
                <p>{props.bio?`${props.bio}`:'hey there I am using chatter'}</p>
            </div>
        </div>
    )
}