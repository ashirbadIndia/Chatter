import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import {deleteUser} from '../../actions/user';
import clearMessages from '../../actions/clearMessages';
import './css/signup.css';

class DeleteUser extends React.Component{

    onSubmit=(values)=>{
        this.props.deleteUser({
            validation: {
                password: values.userPassword
            }
        },this.props.token);
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
    componentWillUnmount=()=>{
        this.props.clearMessages();
    }
    render(){
        return(
            <div className="form">
                <div className="msg-top">
                    <h3>
                    Are you sure you want to do this?
                    </h3>
                    <h5>
                        Your account will be removed instantly. We will delete all your data along with all the conversations you made.
                    </h5>
                    <h4>
                        To verify, enter your current password.
                    </h4>
                </div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="userPassword" component={this.inputField} label="Enter your password" type="password"/>
                    <small className="text-danger">{this.props.passwordErr}</small>
                    <button type="confirm" className="btn btn-danger">Confirm</button>
                </form>
                <div className="msg">
                    <p>
                        Change of mind?{'  '}
                    </p>
                    <Link to="/">
                        Go back!
                    </Link>
                </div>
            </div>
        )
    }
}

const validate = (values,allValues)=>{
    const err={};
    // eslint-disable-next-line
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if(values.userEmail && !(mailformat.test(values.userEmail))){
        err.userEmail = `Invaild 'Email Id'`
    }
    else if(allValues.auth && values.userEmail && values.userEmail!==allValues.auth.emailId){
        err.userEmail = `'Email Id' do not match`
    }
    return err;
}

const formWrapper = reduxForm({
    form: 'deleteUserForm',
    validate: validate
})(DeleteUser);

const mapStateToProps = (state) => {
    return {
        passwordErr: state.formSubmitErrors.delErrMsg,
        auth: state.auth.user,
        token: state.auth.token
    }
}

export default connect(mapStateToProps,{deleteUser,clearMessages})(formWrapper);