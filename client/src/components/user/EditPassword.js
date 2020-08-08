import React from 'react'
import {Modal,Button} from 'react-bootstrap'
import {Field, reduxForm} from 'redux-form'
import { connect } from 'react-redux'

import {editPassword} from '../../actions/user'
import './css/modal.css'

const inputField = ({input,label,meta,type})=>{
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

const Buttons = (props)=>{
  return(<Modal.Footer>
    <button type="submit" className="btn btn-primary">Submit</button>
    <Button onClick={props.onHide}>Close</Button>
  </Modal.Footer>)
}

const form=(props)=>{
    const onSubmit=(values)=>{
      props.editPassword({
        validation:{
          password: values.userPasswordOld
        },
        updateValues: {
          password: values.userPasswordNew
        }
      },props.token);
    }
    return(
      <form onSubmit={props.handleSubmit(onSubmit)}>
          <div className="body">
              <Field name="userPasswordOld" component={inputField} label="Enter your old password" type="password"/>
              <Field name="userPasswordNew" component={inputField} label="Enter a new password" type="password"/>
              <Field name="userPasswordNewRe" component={inputField} label="Confirm password" type="password"/>
              <small className="text-danger">{props.errorMsg}</small>
              <small className="text-success">{props.succMsg}</small>
              <Buttons onHide={props.onHide}/>
          </div>
      </form>
    )
}
const validate = (values)=>{
  const err={};
  if(!values.userPasswordOld){
      err.userPasswordOld = "This is required."
  }
  if(values.userPasswordNew && values.userPasswordNew.length < 5){
      err.userPasswordNew = "Password too short."
  }
  if(values.userPasswordNew !== values.userPasswordNewRe){
      err.userPasswordNewRe = "Password do not match."
  }
  return err;
}
const formWrap = reduxForm({
  form: 'editPassword',
  validate
})(form);

const mapStateToProps = (state)=>{
  return {
    token: state.auth.token,
    errMsg:state.formSubmitErrors.passErrMsg,
    succMsg:state.formSubmitSuccess.passSucMsg
  }
}

const Form = connect(mapStateToProps,{editPassword})(formWrap);

export default (props)=> {
    const hide = ()=>{
      props.onHide();
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change Password
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        <Form onHide={hide}/>
        
        </Modal.Body>
      </Modal>
    );
  }