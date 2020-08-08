import React from 'react';

import Modal from './Modal';
import ColorChooser from './ColorChooser';

const modalBody={
    none:"",
    clearChat:"All conversations will be removed. This step can't be undone.",
    changeColor: <ColorChooser/>,
    removeUser:"All conversations will be removed and the user will be removed from your contact list. However He/She can again start a conversation with you.",
    blockUser:"All conversations will be removed and the user will be removed from your contact list. The person can not contact you again unless you unblock him/her."
}
const modalHeading={
    none:"",
    clearChat:"Are you sure to clear all conversations",
    changeColor:"Change Chat color",
    removeUser:"Are you sure you want to remove this user",
    blockUser:"Are you sure to block this user."
}
export default (props)=>{
    return(
        <>
            <Modal
                show={props.show}
                modalHeading={modalHeading[props.action]}
                modalBody={modalBody[props.action]}
                handleClose={props.handleClose}
                buttonsType={props.action === 'changeColor'? 'close':'y/n'}
            />
        </>
    )
    
}