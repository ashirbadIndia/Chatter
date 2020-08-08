import React from 'react';
import {connect} from 'react-redux';

import history from '../../other/history'
import Card from './Card'
import './css/list.css'

class RecentList extends React.Component{

    onClick=(props)=>{
        if(props.not_exist){
            this.props.removeContact({id: props.id},this.props.token);
        }
        else{
            const userId=props.userId;
            const myId= this.props.auth.id;
            const chatRoomId = (myId >= userId)?`${userId}-${myId}`:`${myId}-${userId}`;
            history.push(`/chat/${chatRoomId}`);
        }
    }

    renderList = () =>{
        return this.props.recents.map((item)=>{
            return(
                <Card key={`${item.userId}`} 
                    firstName={item.firstName}
                    lastName={item.lastName}
                    info={item.lastMessage}
                    id={item.userId}
                    userId={item.userId}
                    handleClick= {this.onClick}
                    not_exist = {item.not_exist}
                />
            )
        })
    }

    render(){
        return(
            <div className="list-centre">
                {this.renderList()}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        recents : state.contacts.recents? state.contacts.recents : [],
        auth: state.auth.user,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(RecentList);