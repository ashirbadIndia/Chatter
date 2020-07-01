export default (state={},action)=>{
    if(action.type === 'EDIT_USER'){
        if(!action.response.error.status)
        {
            return {...state,
                editSucMsg: "Successfully updated your profile"
            }
        }
        else if(action.response.error.status)
        {
            return {...state,
                editSucMsg: null
            }
        }
    }
    if(action.type === 'EDIT_PASSWORD'){
        if(!action.response.error.status)
        {
            return {...state,
                passSucMsg: "Successfully updated your password"
            }
        }
        else if(action.response.error.status)
        {
            return {...state,
                passSucMsg: null
            }
        }
    }
    if(action.type === 'SIGN_UP' && !action.response.error.status){
        return {
            ...state,
            loginPageSuccessMessage: action.response.result.message
        }
    }
    if(action.type === 'DELETE_USER' && !action.response.error.status){
        return {
            ...state,
            loginPageSuccessMessage: action.response.result.message
        }
    }
    if(action.type === 'CLEAR_MESSAGES'){
        return{}
    }
    return state;
}