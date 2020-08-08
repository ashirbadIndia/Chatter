import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import {login} from '../../actions/user'
import clearMessages from '../../actions/clearMessages'
import './css/login.css';

class Login extends React.Component{

    inputField = ({input,label,meta,type,placeholder})=>{
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
                    placeholder={placeholder}
                    {...input}
                />
                {errorHandler(meta)}
            </div>
        )
    }
    onSubmit = (values) =>{
        this.props.login(values);
    }
    componentWillUnmount=()=>{
        this.props.clearMessages();
    }
    render(){
        return(
            <div className="form">
                <h6 className="text-success">{this.props.successMessage}</h6>
                <h3>
                    Log in to Chatter
                </h3>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="userEmail" 
                        component={this.inputField} 
                        label="Email address" 
                        type="email"
                        placeholder={'someone@email.com'}
                        />
                    <Field name="userPassword" component={this.inputField} label="Password" type="password"/>
                    <small className="text-danger">{this.props.submitErrorMsg}</small>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div className="new-account">
                    <p>
                        No account?{'  '}
                    </p>
                    <Link to="/user/create">
                        Create a new one!
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
    if(values.userEmail && !(mailformat.test(values.userEmail))){
        err.userEmail = `Enter a vaild 'Email Id'`
    }
    return err;
}

const formWrapper = reduxForm({
    form: 'loginFormValues',
    validate: validate
})(Login);

const mapStateToProps = (state)=>{
    //console.log(state.auth);
    return{
        submitErrorMsg: state.formSubmitErrors.loginErrMsg,
        successMessage: state.formSubmitSuccess.loginPageSuccessMessage
    }
}

export default connect(mapStateToProps,{login,clearMessages})(formWrapper);