export default (state = {isSignedIn: false}, action) =>{
    //console.log(action.response);
    if(action.type === 'LOG_IN' && !action.response.error.status){
        return {
            isSignedIn: true,
            user: action.response.userInfo,
            token: action.response.token
        }
    }
    if(action.type === 'DELETE_USER' && !action.response.error.status){
        return {
            isSignedIn: false,
        }
    }
    if(action.type === 'EDIT_USER'){
        if(!action.response.error.status)
        {
            return {
                    isSignedIn: state.isSignedIn,
                    user: {...state.user, ...action.response.updatedUserInfo},
                    token: state.token
            }
        }
    }
    if(action.type === 'LOG_OUT'){
        return {
            isSignedIn: false,
        }
    }
    if(action.type === 'LOG_IN_WITH_TOKEN'){
        if(!action.response.error.status){
            return {
                isSignedIn: true,
                user: action.response.userInfo,
                token: action.response.token
            }
        }
        else{
            return{
                isSignedIn: false
            }
        }

    }
    else return state;
}