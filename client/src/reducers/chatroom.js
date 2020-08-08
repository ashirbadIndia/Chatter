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
    else return state;
}