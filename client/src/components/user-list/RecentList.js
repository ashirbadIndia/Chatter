import React from 'react';
import {connect} from 'react-redux';

import Card from './Card'
import './css/list.css'

class RecentList extends React.Component{
    
    renderList = this.props.recents.map((item)=>{
        return(
            <Card/>
        )
    })

    render(){
        return(
            <div className="list-centre">
                {this.renderList}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        recents : state.contacts.favourites? state.contacts.favourites : []
    }
}

export default connect(mapStateToProps)(RecentList);