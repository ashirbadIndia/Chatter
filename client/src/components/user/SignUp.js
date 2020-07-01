import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import {createUser} from '../../actions/user';
import clearMessages from '../../actions/clearMessages';
import './css/signup.css';

class SignUp extends React.Component{

    onSubmit=(values)=>{
        const userBody={
            firstName: values.userFirstName ,
            lastName: values.userLastName?values.userLastName:"",
            emailId : values.userEmail,
            password : values.userPassword,
            bio : values.userBio?values.userBio:""
        }
        this.props.createUser(userBody);
    }
    inputField = ({input,label,meta,type,errMsg})=>{
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
                {(errMsg)?errorHandler({error:errMsg, touched:true}):errorHandler(meta)}
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
        if(!this.props.successMessage){
            this.props.clearMessages();
        }
    }
    render(){
        return(
            <div className="form">
                <h3>
                    Create a new account
                </h3>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="userFirstName" component={this.inputField} label="First Name" type="text"/>
                    <Field name="userLastName" component={this.inputField} label="Last Name" type="text"/>
                    <Field name="userEmail" component={this.inputField} label="Email address" errMsg={this.props.errMsg} type="email"/>
                    <Field name="userPassword" component={this.inputField} label="Enter a new password" type="password"/>
                    <Field name="userPasswordR" component={this.inputField} label="Confirm password" type="password"/>
                    <Field name="userBio" component={this.inputTextArea} label="Tell something more about yourself"/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div className="msg">
                    <p>
                        Already have a account?{'  '}
                    </p>
                    <Link to="/login">
                        Sign-in instead
                    </Link>
                </div>
            </div>
        )
    }
}

const validate = (values)=>{
    const err={};
    // eslint-disable-next-line
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(values.userPassword && values.userPassword.length < 5){
        err.userPassword = "Password too short"
    }
    else if(values.userPasswordR !== values.userPassword){
        err.userPasswordR = "Password do not match"
    }
    if(!values.userFirstName){
        err.userFirstName = "This is required"
    }
    if(values.userEmail && !(mailformat.test(values.userEmail))){
        err.userEmail = `Enter a vaild 'Email Id'`
    }
    return err;
}

const formWrapper = reduxForm({
    form: 'newAccountFormRegisters',
    validate: validate
})(SignUp);

const mapStateToProps = (state)=>{
    return {
        errMsg: state.formSubmitErrors.signupErrMsg,
        successMessage: state.formSubmitSuccess.signupSucMsg
    }
}

export default connect(mapStateToProps,{createUser,clearMessages})(formWrapper);