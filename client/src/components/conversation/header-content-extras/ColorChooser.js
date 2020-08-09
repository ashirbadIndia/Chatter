import React from 'react';
import {connect} from 'react-redux';

import '../css/color-chooser.css';
import {changeColor} from '../../../actions/chat';

const colors= ['default','brutal-blue','dark-pink','light-pink','purple','cyan','green']

class ColorChooser extends React.Component{
    colorsList = colors.map((color)=>{
        return(
            <div key={color} className="list-item" onClick={()=>{this.props.changeColor(color)}}>
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

export default connect(null,{changeColor})(ColorChooser);