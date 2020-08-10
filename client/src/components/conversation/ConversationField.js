import React from 'react';
import {connect} from 'react-redux';
import './css/field.css';
import {addChat} from '../../actions/chat';

class ConversationField extends React.Component{

  state = {text: ''};
  onChange = (e) => {
    this.setState({text: e.target.value});
  }
  onSubmit= (e)=>{
    e.preventDefault();
    const message = this.state.text;
    this.setState({text: ''});
    if(message){
      this.props.addChat(message);
    }
  }
  onClick= (e)=>{
    const message = this.state.text;
    this.setState({text: ''});
    if(message){
      this.props.addChat(message);
    }
  }
  render() {
    return(
      <form onSubmit={this.onSubmit}>
        <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message, "
          value={this.state.text}
          onChange={this.onChange}
        />
        <div className="toolbar-button" onClick={this.onClick}>
        <ion-icon name="send-outline"></ion-icon>
        </div>
      </div>
      </form>
    )
}
} 
  


export default connect(null,{addChat})(ConversationField);