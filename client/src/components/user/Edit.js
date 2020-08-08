import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';

import './css/signup.css';
import {editUser} from '../../actions/user';
import clearMessages from '../../actions/clearMessages';
import EditPassword from './EditPassword';

class Edit extends React.Component{
    state={show: false};
    setShow = (bool)=>{
        this.setState({show: bool});
    }
    onSubmit = (values) => {
        const update = {
            updateValues: {
                firstName: values.userFirstName,
                lastName: values.userLastName,
                emailId: values.userEmail,
                bio: values.userBio
            },
            validation: {
                password: values.userPassword
            }
        }
        this.props.editUser(update,this.props.token);
    }
    inputField = ({input,label,meta,type})=>{
        const errorHandler=({error,touched})=>{
            if(touched){
                return <small className="text-danger">{error}</small>
            }
            else return null
        }
        const successCheck=({error,touched})=>{
            if(touched && error){
                return "is-invalid"
            }
            else if(touched && !error){
                return "is-valid"
            }
            else return null
        }
        return(
            <div className="form-group">
                <label htmlFor={input.name}>{label}</label>
                <input type={type} 
                    className={`form-control ${successCheck(meta)}`} 
                    id={input.name} 
                    {...input}
                />
                {errorHandler(meta)}
            </div>
        )
    }
    inputTextArea = ({input,label}) =>{
        return(
        <div className="form-group">
            <label htmlFor={input.name}>{label}</label>
            <textarea className="form-control" id={input.name} rows="3" {...input}></textarea>
        </div>        
        )
    }
    componentWillUnmount=()=>{
        this.props.clearMessages();
    }
    render(){
        return(
            <div className="form">
                <h3>
                    Edit account details
                </h3>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="userFirstName" component={this.inputField} label="First Name" type="text"/>
                    <Field name="userLastName" component={this.inputField} label="Last Name" type="text"/>
                    <Field name="userEmail" component={this.inputField} label="Email address" type="email"/>
                    <Field name="userBio" component={this.inputTextArea} label="Edit Bio"/>
                    <Field name="userPassword" component={this.inputField} label="Enter your password to confirm" type="password"/> 
                    <small className="text-danger">{this.props.errorMsg}</small>
                    <small className="text-success">{this.props.succMsg}</small>
                    <button type="submit" className="btn btn-primary">Confirm</button>
                </form>
                <div className="msg">
                        <p>
                            To change password{'  '}
                        </p>
                        <p className="link" onClick={() => this.setShow(true)}>
                            Click here
                        </p>
                </div>
                <EditPassword
                    show={this.state.show}
                    onHide={() => this.setShow(false)}
                />
            </div>
        )
    }
}

const validate = (values)=>{
    const err={};
    // eslint-disable-next-line
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(values.userEmail && !(mailformat.test(values.userEmail))){
        err.userEmail = `Enter a vaild 'Email Id'`
    }
    if(!values.userFirstName){
        err.userEmail = `This is Required`
    }
    return err;
}

const formWrapper = reduxForm({
    form: 'editAccountForm',
    validate: validate
})(Edit);

const mapStateToProps = (state)=>{
    return {
        initialValues: {
            userFirstName: state.auth.user? state.auth.user.firstName:null,
            userLastName: state.auth.user? state.auth.user.lastName:null,
            userEmail: state.auth.user? state.auth.user.emailId:null,
            userBio: state.auth.user? state.auth.user.bio:null
        },
        auth: state.auth.user,
        token: state.auth.token,
        errorMsg: state.formSubmitErrors.editErrMsg,
        succMsg: state.formSubmitSuccess.editSucMsg
    }
}

export default connect(mapStateToProps,{editUser,clearMessages})(formWrapper);