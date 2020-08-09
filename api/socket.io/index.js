const jwt = require('jsonwebtoken');
const io = require('socket.io')({path: '/api/chats', origins: '*:*'});

const getChats = require('./getChats');
const addChat = require('./addChat');
const clearChat = require('./clearChats');
const changeColor = require('./changeColor');

io.on('connection',(socket)=>{
    console.log(socket.id);
    socket.auth={stat: false};

    //verify
    socket.on('authorization',async ({token,chatRoomId})=>{
        const auth = token? await jwt.verify(token,'privacy_is_a_myth'): null;
        if(!auth){
            socket.emit('verify',{auth:false});
            socket.disconnect();
        }
        else{
            socket.auth={stat:true,userId:auth.id};
            socket.chatRoomId=chatRoomId;
            socket.join(chatRoomId);
            socket.emit('verify',{auth:true});
        } 
    });
    socket.on('get_chats',()=>{getChats(socket)});
    socket.on('add_chat',(message)=>{addChat(socket,io,message)});
    socket.on('clear_chats',()=>{clearChat(socket,io)});
    socket.on('change_color',(color)=>{changeColor(socket,color)});

});

module.exports = io;