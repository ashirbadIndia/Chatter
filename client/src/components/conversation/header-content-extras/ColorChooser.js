import React from 'react';
import {connect} from 'react-redux';

import '../css/color-chooser.css';
import chatColorChoose from '../../../actions/chatColorChoose';

const colors= ['default','brutal-blue','dark-pink','light-pink','purple','cyan','green']

class ColorChooser extends React.Component{
    colorsList = colors.map((color)=>{
        return(
            <div className="list-item" onClick={()=>{this.props.chatColorChoose(color)}}>
                <div className={`color ${color}`}>
                </div> 
            </div>
        );
    });
    render(){
        return(
            <div className="body">
                {this.colorsList}
            </div>
        );
    }
}

export default connect(null,{chatColorChoose})(ColorChooser);