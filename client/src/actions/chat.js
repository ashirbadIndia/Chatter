import io from 'socket.io-client'

let socket={};

export const socketConnect = (chatRoomId,token) => (dispatch)=>{
    if(!socket.connected){
        socket = io('http://localhost:4000/',{path:'/api/chats'});
        socket.on('connect',()=>{
            socket.emit('authorization',{token:token,chatRoomId:chatRoomId});
            socket.on('verify',(stat)=>{
                if(stat.auth){
                    console.log('connected');
                    dispatch({
                        type: "CONNECTED_TO_SOCKET",
                        chatRoomId: chatRoomId
                    })
                }
            })
            socket.on('receive_chats',(response)=>{
                dispatch({
                    type: "GET_CHATS",
                    data:{
                        userDetail: response.userDetail,
                        messages: response.messages,
                        myDetail: response.myDetail
                    }
                })
            })
    
            socket.on('chat_added',(response)=>{
                console.log('count');
                dispatch({
                    type: "ADD_CHAT",
                    response: response
                })
            });
            
        })
    }
    
}

export const socketDisconnect = () => async (dispatch)=>{
    if(socket.connected){
        await socket.close();
        console.log('disconnected');
        dispatch({
            type: "DISCONNECTED_FROM_SOCKET"
        })
    }
}

export const syncChats = () => async (dispatch)=>{
    if(socket.connected){
        await socket.emit('get_chats');
    }
    dispatch({type: "NOTHING"});
}

export const addChat = (message) => async (dispatch)=>{
    if(socket.connected){
        console.log(message);
        await socket.emit('add_chat',message);
    }
    dispatch({type: "NOTHING"});
}