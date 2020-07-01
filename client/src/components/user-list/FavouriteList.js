import React from 'react';
import {connect} from 'react-redux';

import Card from './Card'
import './css/list.css'

class FavouriteList extends React.Component{
    
    renderList = this.props.favourites.map((item)=>{
        return(
            <Card key={`${item.userId}`}/>
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
        favourites : state.contacts.favourites? state.contacts.favourites: []
    }
}

export default connect(mapStateToProps)(FavouriteList);