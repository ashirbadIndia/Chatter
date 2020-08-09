export default (state = {isConnected:false, isSynced:false} ,action)=>{

    if(action.type === 'CONNECTED_TO_SOCKET'){
        return {...state, isConnected: true, isSynced:false, chatRoomId: action.chatRoomId};
    }

    if(action.type === 'DISCONNECTED_FROM_SOCKET'){
        return {isConnected: false, isSynced:false};
    }
    if(action.type === 'GET_CHATS'){
        return {
            ...state,
            isSynced: true,
            userDetail: action.data.userDetail,
            color: action.data.color,
            myDetail: action.data.myDetail,
            messages: action.data.messages
        }
    }
    if(action.type === 'ADD_CHAT'){
        return {
            ...state,
            messages: [...state.messages, action.response]
        }
    }
    if(action.type === 'CLEAR_CHAT'){
        return {
            ...state,
            messages: []
        }
    }
    if(action.type === 'CHANGE_COLOR'){
        return {
            ...state,
            color: action.color
        }
    }
    else return state;
}