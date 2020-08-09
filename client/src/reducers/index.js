import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import auth from './auth';
import contacts from './contacts';
import searchUser from './searchUser';
import formSubmitErrors from './formSubmitErrors';
import formSubmitSuccess from './formSubmitSuccess';
import chatroom from './chatroom';

const autoLoginStats = (state="pending", action)=>{
    if(action.type === 'LOG_IN_WITH_TOKEN'){
        return "resolved"
    }
    else return state;
}

export default combineReducers({
    searchResults: searchUser,
    auth: auth,
    form: formReducer,
    contacts: contacts,
    formSubmitErrors,
    formSubmitSuccess,
    autoLoginStats,
    chatRoom: chatroom
})